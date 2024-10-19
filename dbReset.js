import mongoose from "mongoose";

// MongoDB connection URL (replace with your actual connection string)
const dbURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@xexit.qxnd9.mongodb.net/exitease`; // Change to your MongoDB URI

// Import the models
import User from "./backend/src/models/user/index.js"; // Adjust the path based on your folder structure
import Role from "./backend/src/models/role/index.js";
import Permission from "./backend/src/models/permission/index.js";
import RolePermission from "./backend/src/models/role_permission/index.js";
import Questionnaire from "./backend/src/models/questionnaire/index.js";

// Seed data
const adminUser = {
  _id: "66e6a5745cbbf58b614ed8a4",
  username: "admin",
  password: "$2a$10$9S83RiqrgngKhnQl08R/xuDXdCYifLncp/dmHEIxd/8K3RWVQmKs2", // bcrypt hash of "password"
  createdAt: new Date("2024-09-15T09:14:28.346+00:00"),
  updatedAt: new Date("2024-09-15T09:14:28.346+00:00"),
};

const roles = [
  { _id: "66e6a2b6b975196b4bc2ee15", role: "admin" },
  { _id: "66e6a33cb975196b4bc2ee16", role: "employee" },
];

const permissions = [
  { _id: "66e6b78cb975196b4bc2ee17", subject: "resignation", action: "submit" },
  { _id: "66e6b813b975196b4bc2ee18", subject: "resignation", action: "review" },
  {
    _id: "66e6b825b975196b4bc2ee19",
    subject: "resignation",
    action: "see_all",
  },
  { _id: "66e6b841b975196b4bc2ee1a", subject: "responses", action: "see_all" },
  { _id: "66e6b86cb975196b4bc2ee1b", subject: "lwd", action: "update" },
];

const rolePermissions = [
  {
    _id: "66e6b8b7b975196b4bc2ee1c",
    permissionId: "66e6b78cb975196b4bc2ee17",
    roleId: "66e6a33cb975196b4bc2ee16",
  },
  {
    _id: "66e6b9d6b975196b4bc2ee1d",
    permissionId: "66e6b813b975196b4bc2ee18",
    roleId: "66e6a2b6b975196b4bc2ee15",
  },
  {
    _id: "66e6b9ebb975196b4bc2ee1e",
    permissionId: "66e6b825b975196b4bc2ee19",
    roleId: "66e6a2b6b975196b4bc2ee15",
  },
  {
    _id: "66e6b9f6b975196b4bc2ee1f",
    permissionId: "66e6b841b975196b4bc2ee1a",
    roleId: "66e6a2b6b975196b4bc2ee15",
  },
  {
    _id: "66e6b9feb975196b4bc2ee20",
    permissionId: "66e6b86cb975196b4bc2ee1b",
    roleId: "66e6a2b6b975196b4bc2ee15",
  },
];

const questionnaires = [
  {
    _id: "66e6d45ae8ae6d3a7278d4c2",
    questionText: "What prompted you to start looking for another job?",
    options: [],
  },
  {
    _id: "66e6d45ae8ae6d3a7278d4c3",
    questionText: "What did you like most about your job?",
    options: [],
  },
  {
    _id: "66e6d45ae8ae6d3a7278d4c4",
    questionText: "What did you like least about your job?",
    options: [],
  },
  {
    _id: "66e6d45ae8ae6d3a7278d4c5",
    questionText: "Do you feel your job responsibilities were clear?",
    options: [],
  },
  {
    _id: "66e6d45ae8ae6d3a7278d4c6",
    questionText: "Would you recommend this company to others?",
    options: [],
  },
];

const resetDatabase = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Drop collections
    await mongoose.connection.db.dropDatabase();
    console.log("Database dropped successfully");

    // Seed data
    await User.create(adminUser);
    await Role.insertMany(roles);
    await Permission.insertMany(permissions);
    await RolePermission.insertMany(rolePermissions);
    await Questionnaire.insertMany(questionnaires);

    console.log("Database seeded successfully");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error resetting the database:", error);
    process.exit(1);
  }
};

// Execute the reset
resetDatabase();
