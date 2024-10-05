import express from "express";
import {
  Resignation,
  UserResponse,
  Questionnaire,
} from "../../models/index.js";
import fetchRoleAndPermissions from "../../../helpers/fetchRolesAndPermissions.js";
import { canSubmitResignation } from "../../../middleware/authorize.js";
import checkCalendarForHolidays from "../../../helpers/checkCalendar.js";

async function getQuestionnaireOrResponses(req) {
  let questionnaire = [],
    responses = [];
  let UserResponses = await UserResponse.findOne({ user_id: req.user._id });
  if (!UserResponses) {
    questionnaire = await Questionnaire.find();
  } else {
    responses = UserResponses.responses;
  }
  return {
    questionnaire,
    responses,
  };
}
const router = express.Router();

router.get("/permissions", async (req, res) => {
  try {
    const data = await fetchRoleAndPermissions(req);
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({ error: "failed to get permissions" });
  }
});

router.post(
  "/resign",
  canSubmitResignation,
  checkCalendarForHolidays,
  async (req, res) => {
    try {
      let resignation = await Resignation.findOne({ user_id: req.user._id });
      if (!resignation) {
        resignation = await new Resignation({
          user_id: req.user._id,
          lwd: req.body.lwd,
        }).save();
      }
      let questionnaire = [],
        responses = [];
      if (resignation) {
        let res = await getQuestionnaireOrResponses(req);
        questionnaire = res.questionnaire;
        responses = res.responses;
      }
      res.status(200).json({
        data: {
          resignation,
          questionnaire,
          responses,
        },
      });
    } catch (err) {
      res.status(500).json({ error: "resignation failed" });
    }
  }
);

// check if user has resigned - resignations collection
// if resignation is present check for responses
// if not return questionnaire
router.get("/resignation", async (req, res) => {
  try {
    let resignation = await Resignation.findOne({ user_id: req.user._id });
    let questionnaire = [],
      responses = [];
    if (resignation) {
      let res = await getQuestionnaireOrResponses(req);
      questionnaire = res.questionnaire;
      responses = res.responses;
    }
    res.status(200).json({
      data: {
        resignation,
        questionnaire,
        responses,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "resignation fetch failed" });
  }
});

router.post("/responses", async (req, res) => {
  try {
    let resignation = await Resignation.findOne({ user_id: req.user._id });
    if (!resignation) {
      res.status(400).json({
        error: "user has not resigned yet",
      });
    } else {
      let responses = await UserResponse.findOne({ user_id: req.user._id });
      if (responses) {
        res.status(400).json({
          error: "responses are already recorded",
        });
      } else {
        const newUserResponse = new UserResponse({
          user_id: req.user._id,
          responses: req.body.responses,
        });

        // Save the document to the database
        const savedResponse = await newUserResponse.save();
        res.status(200).json({
          data: {
            resignation,
            questionnaire: [],
            responses: savedResponse.responses,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "responses could not be saved" });
  }
});

export default router;
