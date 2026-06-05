import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
   category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    document: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: (value: any) => value?.type === "doc",
        message: "Invalid Tiptap document",
      },
    },

    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Post", postSchema);