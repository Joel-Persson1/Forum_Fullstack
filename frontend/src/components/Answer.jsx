import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Error } from "./Error";
import { AnswerEditMode } from "./AnswerEditMode";
import { AnswerDefaultMode } from "./AnswerDefaultMode";

export function Answer({ data, fetchAnswers }) {
  const { handleApiRequest, error } = useContext(GlobalContext);
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState(data.answerContent);
  const [contributor, setContributor] = useState(data.contributor);
  const [errorMsg, setErrorMsg] = useState("");

  const id = data.answerId;

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const editValidation = () => {
    let hasError = false;

    if (data.contributor === contributor && data.answerContent === content) {
      setErrorMsg("You must edit the fields");
      hasError = true;
    }

    if (contributor.trim().length < 1 || content.trim().length < 1) {
      setErrorMsg("Enter your name and describe your answer");
      hasError = true;
    }

    if (!hasError) {
      setErrorMsg(""); // Clear error message if there are no issues
    }

    return hasError; // Return true if there's an error
  };

  const handleEditButton = async (e) => {
    e.preventDefault();

    if (editValidation()) return; // Stop execution if validation fails

    const result = await handleApiRequest({
      endpoint: "/api/answer/put/",
      id: data.answerId,
      method: "PUT",
      body: { contributor, content },
      errMsg: "Failed to update thread",
    });

    if (result) fetchAnswers();

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
      {error && <Error error={error} />}

      {!editMode && (
        <AnswerDefaultMode
          data={data}
          handleDeleteAnswer={handleDeleteAnswer}
          toggleEditMode={toggleEditMode}
        />
      )}

      {editMode && (
        <AnswerEditMode
          handleEditButton={handleEditButton}
          contributor={contributor}
          setContributor={setContributor}
          content={content}
          setContent={setContent}
          toggleEditMode={toggleEditMode}
          handleDeleteAnswer={handleDeleteAnswer}
          errorMsg={errorMsg}
          data={data}
        />
      )}
    </section>
  );
}
