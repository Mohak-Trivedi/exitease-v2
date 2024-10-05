import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Role, UserRole } from "../../models/index.js";
import verifyToken from "../../../middleware/authenticate.js";
import fetchRoleAndPermissions from "../../../helpers/fetchRolesAndPermissions.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const data = await fetchRoleAndPermissions(req);
  res.status(200).json({ status: "Authenticated", ...data });
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    const { _id: userId } = await user.save();
    const { _id: roleId } = await Role.findOne({ role: "employee" });
    await new UserRole({
      userId,
      roleId,
    }).save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    req.user = {
      _id: user._id,
    };
    const token = jwt.sign(
      { userId: user._id, userName: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    const data = await fetchRoleAndPermissions(req);
    res.status(200).json({ token, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
