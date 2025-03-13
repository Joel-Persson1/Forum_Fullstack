import express from "express";
import {
  getAnswersByThreadId,
  postAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answersController.js";
import {
  validateIdParam,
  validateAnswerFields,
  validateAnswerUpdateFields,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/api/answer/get/:id", validateIdParam, getAnswersByThreadId);
router.post(
  "/api/answer/post/:id",
  validateIdParam,
  validateAnswerFields,
  postAnswer
);
router.put(
  "/api/answer/put/:id",
  validateIdParam,
  validateAnswerUpdateFields,
  updateAnswer
);
router.delete("/api/answer/delete/:id", validateIdParam, deleteAnswer);

export default router;
