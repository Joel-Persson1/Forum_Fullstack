import {
  getAnswersByThreadIdFromDB,
  postAnswerToDB,
  updateAnswerInDB,
  deleteAnswerFromDB,
  getThreadIdByAnswerId,
} from "../models/answerModel.js";
import { updateThreadInDB } from "../models/threadModel.js";

export const getAnswersByThreadId = (req, res, next) => {
  try {
    const { id } = req.params;
    const response = getAnswersByThreadIdFromDB(id);

    if (!response) {
      return res.status(404).json({ error: "Answers to thread not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const postAnswer = (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, contributor } = req.body;

    postAnswerToDB(id, content, contributor);

    updateThreadInDB(null, null, id);

    res.status(201).json({ message: "Answer added successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateAnswer = (req, res, next) => {
  try {
    const { contributor, content } = req.body;
    const { id } = req.params;

    updateAnswerInDB(contributor, content, id);

    const threadId = getThreadIdByAnswerId(id);

    updateThreadInDB(null, null, threadId);

    res.status(200).json({ message: "Answer updated successfully" });
  } catch (error) {
    console.error("Error updating answer:", error);
    next(error);
  }
};

export const deleteAnswer = (req, res, next) => {
  try {
    const { id } = req.params;

    const threadId = getThreadIdByAnswerId(id);

    updateThreadInDB(null, null, threadId);

    deleteAnswerFromDB(id);

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    next(error);
  }
};
