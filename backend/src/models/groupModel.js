import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        avatar: {
            type: String,
            default: null,
        },

        visibility: {
            type: String,
            enum: ["private", "public"],
            default: "private",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export const Group = mongoose.model("Group", groupSchema);