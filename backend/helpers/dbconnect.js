import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.zjels.mongodb.net/exitease`;

export default mongoose
  .connect(uri)
  .then(() => console.log("DB connection established"));
