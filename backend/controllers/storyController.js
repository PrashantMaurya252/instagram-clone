import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import Story from "../models/storyModel.js";
import { User } from "../models/userModel.js";
import mediaModel from "../models/mediaModel.js";
import StoryView from "../models/storyViewModel.js";

export const createStory = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) return res.status(400).json({ message: "Image required" });

    // Optimize image (same as post)
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 1200, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const mediaDoc = await mediaModel.create({
      type: "image",
      url: cloudResponse.secure_url,
      publicId: cloudResponse.public_id || "unknown",
      format: cloudResponse.format || "jpeg",
      width: cloudResponse.width,
      height: cloudResponse.height,
      bytes: cloudResponse.bytes,
    });

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

    const story = await Story.create({
      user: authorId,
      media: mediaDoc._id,
      caption,
      expiresAt
    });

    await story.populate({ path: "user", select: "-password" });
    await story.populate("media");

    return res.status(201).json({
      message: "New story added",
      story,
      success: true,
    });
  } catch (error) {
    console.log(error, "create story api");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeedStories = async (req, res) => {
  try {
    const userId = req.id;

    // Get users that current user follows and whose request is accepted
    const following = await Follow.find({
      follower: userId,
      status: "accepted",
    }).select("following");

    const followingIds = following.map((follow) => follow.following);

    // Get all public users
    const publicUsers = await User.find({
      isPrivate: false,
    }).select("_id");

    const allowedAuthors = [
      userId,
      ...followingIds,
      ...publicUsers.map((user) => user._id),
    ];

    const stories = await Story.find({
      user: { $in: allowedAuthors },
      expiresAt: { $gt: new Date() },
    })
      .sort({ createdAt: -1 })
      .populate("media")
      .populate({
        path: "user",
        select: "username profilePicture",
        populate: {
          path: "profilePicture",
          model: "media",
        },
      });

    return res.status(200).json({
      success: true,
      stories,
    });
  } catch (error) {
    console.error("get feed stories error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const viewStory = async (req, res) => {
  try {
    const storyId = req.params.id;
    const viewerId = req.id;

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found", success: false });

    // Try to create the view, ignore if already viewed (due to unique index)
    try {
      await StoryView.create({
        story: storyId,
        viewer: viewerId
      });
    } catch (err) {
      if (err.code === 11000) {
        // Duplicate key error, means already viewed
        return res.status(200).json({ message: "Story already viewed", success: true });
      }
      throw err;
    }

    return res.status(200).json({ message: "Story viewed", success: true });
  } catch (error) {
    console.log(error, "view story api error");
    return res.status(500).json({ message: "Internal server error" });
  }
};
