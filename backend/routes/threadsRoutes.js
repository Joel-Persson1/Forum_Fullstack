import express from "express";
import {
  getThreads,
  getThreadById,
  postThread,
  updateThread,
  deleteThread,
} from "../controllers/threadsController.js";
import {
  validateIdParam,
  validateThreadFields,
  validateThreadUpdateFields,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/api/threads", getThreads);
router.get("/api/threads/:id", validateIdParam, getThreadById);
router.post("/api/question/post", validateThreadFields, postThread);
router.put("/api/question/put/:id", validateThreadUpdateFields, updateThread);
router.delete("/api/thread/delete/:id", validateIdParam, deleteThread);

export default router;
