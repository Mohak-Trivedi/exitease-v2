import { Schema } from "mongoose";

export default new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, // Reference to the User schema
      ref: "user", // Refers to the User model
      required: true, // The user_id is mandatory
    },
    responses: [
      {
        questionText: {
          type: String, // Question text
          required: true, // The question field is mandatory
        },
        response: {
          type: String, // Response text
          required: true, // The response field is mandatory
        },
      },
    ],
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);
