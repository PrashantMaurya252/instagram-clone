import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["image", "video"],
            required: true,
        },

        url: {
            type: String,
            required: true,
        },

        publicId: {
            type: String,
            required: true,
        },

        resourceType: {
            type: String,
            enum: ["image", "video", "raw"],
            default: "image",
        },

        format: {
            type: String,
        },

        width: {
            type: Number,
        },

        height: {
            type: Number,
        },

        duration: {
            type: Number, // useful for videos, in seconds
        },

        bytes: {
            type: Number,
        },
    },
    {
        timestamps: true
    }
);

const mediaModel = mongoose.model("media", mediaSchema);
export default mediaModel;