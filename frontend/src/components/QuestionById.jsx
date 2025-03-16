import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Trash, Pencil, Check } from "lucide-react";

export function QuestionById({ thread, handleDeleteThread, fetchThread }) {
  const { handleApiRequest, error } = useContext(GlobalContext);
  const [title, setTitle] = useState(thread.title);
  const [content, setContent] = useState(thread.content);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditButton = async (e) => {
    e.preventDefault();

    if (thread.title !== title || thread.content !== content) {
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
    <article className="clicked-question">
      {error && <p className="error-box">{error}</p>}

      {!editMode && (
        <>
          <div className="flex">
            <h1>{title}</h1>
            <div className="btn-box">
              <button className="button" onClick={() => handleDeleteThread()}>
                <Trash size={20} color="black" />
              </button>
              <button className="button" onClick={() => toggleEditMode()}>
                <Pencil size={20} color="black" />
              </button>
            </div>
          </div>

          <p>{content}</p>
        </>
      )}

      {editMode && (
        <form className="edit-form-box" onSubmit={handleEditButton}>
          <div>
            <input
              className="edit-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="edit-textarea-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="btn-box">
            <button className="button" onClick={() => handleDeleteThread()}>
              <Trash size={20} color="black" />
            </button>
            <button className="button" type="submit">
              <Check size={20} color="black" />
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
