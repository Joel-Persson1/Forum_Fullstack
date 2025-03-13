import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export function QuestionById({ thread, handleDeleteThread, fetchThread }) {
  const { handleApiRequest } = useContext(GlobalContext);
  const [title, setTitle] = useState(thread.title);
  const [content, setContent] = useState(thread.content);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditButton = async (e) => {
    e.preventDefault();

    if (thread.title !== title || thread.content !== content) {
      console.log("fetching");
      const result = await handleApiRequest({
        endpoint: "/api/question/put/",
        id: thread.threadId,
        method: "PUT",
        body: { title, content },
        errMsg: "Failed to update thread",
      });

      if (result) fetchThread();
    }

    setEditMode(false);
  };

  return (
    <article>
      {!editMode && (
        <>
          <h1>{title}</h1>
          <button onClick={() => handleDeleteThread()}>trashcan</button>
          <button onClick={() => toggleEditMode()}>edit</button>
          <p>{content}</p>
        </>
      )}

      {editMode && (
        <form onSubmit={handleEditButton}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={() => handleDeleteThread()}>trashcan</button>
          <button type="submit">edit</button>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      )}
    </article>
  );
}
