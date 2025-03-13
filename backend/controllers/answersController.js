import {
  getAnswersByThreadIdFromDB,
  postAnswerToDB,
  updateAnswerInDB,
  deleteAnswerFromDB,
} from "../models/answerModel.js";

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

    res.status(200).json({ message: "Answer updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteAnswer = (req, res, next) => {
  try {
    const { id } = req.params;

    deleteAnswerFromDB(id);

    res.status(200).json({ message: "Answer deleted successfully" });
  } catch (error) {
    next(error);
  }
};
