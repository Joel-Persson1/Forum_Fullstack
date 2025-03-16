import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Trash, Pencil, Check, X } from "lucide-react";

export function Answer({ data, fetchAnswers }) {
  const { handleApiRequest, error } = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(data.answerContent);
  const [contributor, setContributor] = useState(data.contributor);

  const id = data.answerId;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleEditButton = async (e) => {
    e.preventDefault();

    if (data.contributor !== contributor || data.content !== content) {
      const result = await handleApiRequest({
        endpoint: "/api/answer/put/",
        id: data.answerId,
        method: "PUT",
        body: { contributor, content },
        errMsg: "Failed to update thread",
      });

      if (result) fetchAnswers();
    }

    setEditMode(false);
  };

  const handleDeleteAnswer = () => {
    handleApiRequest({
      endpoint: `/api/answer/delete/`,
      id: id,
      method: "DELETE",
      errMsg: "Could not delete answer",
    }).then((res) => console.log(res.message));
  };

  return (
    <section className="answer-box">
      {error && <p>{error}</p>}

      {!editMode && (
        <>
          <div className="title-btn-box">
            <h3 className="answer-contributor">{data.contributor}</h3>
            <div className="btn-box">
              <button className="button" onClick={() => handleDeleteAnswer()}>
                <Trash size={20} color="black" />
              </button>
              <button className="button" onClick={() => toggleEditMode()}>
                <Pencil size={20} color="black" />
              </button>
            </div>
          </div>

          <p className="answer-content">{data.answerContent}</p>
        </>
      )}

      {editMode && (
        <form className="title-btn-box" onSubmit={handleEditButton}>
          <div className="edit-title-content-box">
            <input
              className="inputField"
              type="text"
              value={contributor}
              onChange={(e) => setContributor(e.target.value)}
            />

            <textarea
              className="inputField"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="btn-box">
            <button className="button" onClick={() => toggleEditMode()}>
              <X size={20} color="black" />
            </button>
            <button className="button" onClick={() => handleDeleteAnswer()}>
              <Trash size={20} color="black" />
            </button>
            <button className="button" type="submit">
              <Check size={20} color="black" />
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
