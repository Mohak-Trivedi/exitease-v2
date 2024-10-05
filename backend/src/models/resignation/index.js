import { Schema } from "mongoose";
import { format } from "date-fns";

const ResignationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, // Reference to the User schema
      ref: "user", // Refers to the User model
      required: true, // The user_id is mandatory
    },
    lwd: {
      type: Date, // Last Working Day
      required: true, // This field is mandatory
    },
    approved: {
      type: Boolean,
      default: false, // Default value is set to false
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

// Override `toJSON` to format the date
ResignationSchema.methods.toJSON = function () {
  const obj = this.toObject();

  // Format the `lastWorkingDay` field
  if (obj.lwd) {
    obj.lwd = format(new Date(obj.lwd), "dd MMM yyyy");
  }

  return obj;
};

export default ResignationSchema;
