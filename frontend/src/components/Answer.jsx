import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export function Answer({ data, fetchAnswers }) {
  const { handleApiRequest } = useContext(GlobalContext);
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
    }).then((res) => alert(res.message));
  };

  return (
    <section>
      {!editMode && (
        <>
          <h3>{data.contributor}</h3>
          <button onClick={() => handleDeleteAnswer()}>trashcan</button>
          <button onClick={() => toggleEditMode()}>edit</button>
          <p>{data.answerContent}</p>
          <hr />
        </>
      )}

      {editMode && (
        <form onSubmit={handleEditButton}>
          <input
            type="text"
            value={contributor}
            onChange={(e) => setContributor(e.target.value)}
          />
          <button onClick={() => handleDeleteAnswer()}>trashcan</button>
          <button type="submit">edit</button>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      )}
    </section>
  );
}
