import express from "express";
import {
  canGetAllResignation,
  canGetAllResponses,
  canReviewResignation,
} from "../../../middleware/authorize.js";
import { Resignation, UserResponse } from "../../models/index.js";

const router = express.Router();

router.get("/resignations", canGetAllResignation, async (req, res) => {
  try {
    let resignations = await Resignation.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "username");
    res.status(200).json({
      data: resignations,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch all resignations" });
  }
});

router.put("/conclude_resignation", canReviewResignation, async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;

    const updatedResignation = await Resignation.findOneAndUpdate(
      { _id: resignationId },
      {
        approved,
        lwd: new Date(lwd),
      },
      { new: true }
    );

    if (!updatedResignation) {
      return res.status(404).json({ error: "Resignation not found" });
    }

    res.status(200).json({ data: updatedResignation });
  } catch (error) {
    console.error("Error updating resignation:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.get("/exit_responses", canGetAllResponses, async (req, res) => {
  try {
    let responses = await UserResponse.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "username");
    res.status(200).json({
      data: responses,
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch all responses" });
  }
});

export default router;
