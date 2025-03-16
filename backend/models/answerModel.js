import db from "../utilities/database.js";

export const getAnswersByThreadIdFromDB = (id) => {
  const stmt = db.prepare("SELECT * FROM answer WHERE threadId = ?");
  return stmt.all(id);
};

export const postAnswerToDB = (id, content, contributor) => {
  const stmt = db.prepare(
    "INSERT INTO answer (threadId, answerContent, contributor) VALUES (?, ?, ?)"
  );
  return stmt.run(id, content, contributor);
};

export const updateAnswerInDB = (contributor, content, id) => {
  const stmt = db.prepare(
    "UPDATE answer SET contributor=?, answerContent=? WHERE answerId=?"
  );
  return stmt.run(contributor, content, id);
};

export const deleteAnswerFromDB = (id) => {
  const stmt = db.prepare("DELETE FROM answer WHERE answerId = ?");
  return stmt.run(id);
};

export const getThreadIdByAnswerId = (answerId) => {
  const stmt = db.prepare("SELECT threadId FROM answer WHERE answerId = ?");
  const result = stmt.get(answerId);
  return result ? result.threadId : null;
};
