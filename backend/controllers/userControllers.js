import messageModel from "../models/messageModel";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error, "register api error");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      post: user.posts,
      bookmarks: user.bookmarks,
    };

    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error, "login api error");
  }
};

export const logout = async(_,res)=>{
    try {
        return res.cookie("token","",{maxAge:0}).json({
            message:'Logged Out successfully',
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getProfile = async(req,res)=>{
    try {
        const userId = req.params.id;
        let user = await User.findById(userId)
        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error,"getProfile error")
    }
}

export const editProfile = async (req,res)=>{
    try {
        const userId = req.id;
        let clodi
    } catch (error) {
        console.log(error,"editProfile error")
    }
}
