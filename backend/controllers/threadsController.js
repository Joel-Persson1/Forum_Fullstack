import {
  getThreadsFromDB,
  getThreadByIdFromDB,
  insertThreadToDB,
  updateThreadInDB,
  deleteThreadFromDB,
} from "../models/threadModel.js";

export const getThreads = (req, res, next) => {
  try {
    let category = req.query.category || null;
    const search = req.query.search || null;

    const questions = getThreadsFromDB(category, search);

    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

export const getThreadById = (req, res, next) => {
  try {
    const { id } = req.params;
    const questionWithId = getThreadByIdFromDB(id);

    if (!questionWithId) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json(questionWithId);
  } catch (error) {
    next(error);
  }
};

export const postThread = (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    const result = insertThreadToDB(title, content, category);

    res.status(201).json({ message: "Thread added successfully", ...result });
  } catch (error) {
    next(error);
  }
};

export const updateThread = (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    updateThreadInDB(title, content, id);

    res.status(200).json({ message: "Thread updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteThread = (req, res, next) => {
  try {
    const { id } = req.params;

    deleteThreadFromDB(id);

    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    next(error);
  }
};
