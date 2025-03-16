import db from "../utilities/database.js";

export const getThreadsFromDB = (category, search, sortType) => {
  if (category === "all") category = null;

  let query = `
    SELECT
      threads.threadId,
      threads.title,
      threads.content,
      threads.category,
      threads.updated_at,
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

  switch (sortType) {
    case "newest":
      query += " ORDER BY threads.created_at DESC";
      break;
    case "most_replies":
      query += " ORDER BY reply_count DESC";
      break;
    case "time":
      query += " ORDER BY updated_at DESC";
      break;
    default:
      break;
  }

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
  const params = []; // Start with the thread ID

  // Prepare the SQL statement
  let query = `
    UPDATE threads 
    SET 
      updated_at = CURRENT_TIMESTAMP 
  `;

  // Only add title and content to the query if they are not null
  if (title !== null) {
    query += ", title = ?";
    params.push(title); // Add title to params
  }

  if (content !== null) {
    query += ", content = ?";
    params.push(content); // Add content to params
  }

  query += " WHERE threadId = ?"; // Ensure the WHERE clause is included
  params.push(id);

  const stmt = db.prepare(query);

  return stmt.run(...params); // Spread the parameters array
};

export const deleteThreadFromDB = (id) => {
  const stmt = db.prepare("DELETE FROM threads WHERE threadId = ?");
  return stmt.run(id);
};
