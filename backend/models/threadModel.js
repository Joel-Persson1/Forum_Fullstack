import db from "../utilities/database.js";

export const getThreadsFromDB = (category, search) => {
  if (category === "all") category = null;

  let query = `
    SELECT
      threads.threadId,
      threads.title,
      threads.content,
      threads.category,
      threads.created_at AS thread_created_at,
      MAX(answer.created_at) AS last_answer_at,
      COUNT(answer.answerId) AS reply_count
    FROM threads
    LEFT JOIN answer ON threads.threadId = answer.threadId
    WHERE (threads.category = ? OR ? is NULL)
  `;

  let params = [category, category];

  if (search) {
    query += " AND (threads.title LIKE ? OR threads.content LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  query += " GROUP BY threads.threadId";

  const stmt = db.prepare(query);
  return stmt.all(...params);
};

export const getThreadByIdFromDB = (id) => {
  const stmt = db.prepare("SELECT * FROM threads WHERE threadId=?");
  return stmt.get(id);
};

export const insertThreadToDB = (title, content, category) => {
  const stmt = db.prepare(
    "INSERT INTO threads (title, content, category) VALUES (?, ?, ?)"
  );
  return stmt.run(title, content, category);
};

export const updateThreadInDB = (title, content, id) => {
  const stmt = db.prepare(
    "UPDATE threads SET title=?, content=? WHERE threadId=?"
  );
  return stmt.run(title, content, id);
};

export const deleteThreadFromDB = (id) => {
  const stmt = db.prepare("DELETE FROM threads WHERE threadId = ?");
  return stmt.run(id);
};
