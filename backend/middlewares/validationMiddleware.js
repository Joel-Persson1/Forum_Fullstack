export const validateThreadFields = (req, res, next) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: "Title, description and category are missing." });
  }
  next();
};

export const validateAnswerFields = (req, res, next) => {
  const { content, contributor } = req.body;

  if (!content) {
    return res.status(400).json({ message: "The answer is not defined." });
  }

  next();
};

export const validateIdParam = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is missing" });
  }

  next();
};

export const validateThreadUpdateFields = (req, res, next) => {
  const { title, content } = req.body;

  if (!title && !content) {
    return res
      .status(400)
      .json({ message: "Title or content is missing in the request" });
  }

  next();
};

export const validateAnswerUpdateFields = (req, res, next) => {
  const { contributor, content } = req.body;

  if (!contributor && !content) {
    return res
      .status(400)
      .json({ message: "Contributor or content is missing in the request" });
  }

  next();
};
