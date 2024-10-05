import { Schema } from "mongoose";

export default new Schema({
  questionText: {
    type: String,
    required: true, // The question is mandatory
  },
  options: {
    type: [String], // Array of strings representing the options
    required: true,
  },
});
