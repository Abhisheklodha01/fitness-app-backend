import mongoose,{ Schema } from "mongoose";

const fitnessSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    },

    weight: {
        type: Number,
        required: true
    },

    goal: {
        type: String,
        required: true
    }


}, {timestamps: true})

export const Fitness = mongoose.model("Fitness", fitnessSchema)