import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Error } from "./Error";
import { QuestionEditMode } from "./QuestionEditMode";
import { QuestionDefaultMode } from "./QuestionDefaultMode";

export function QuestionById({ thread, handleDeleteThread, fetchThread }) {
  const { handleApiRequest, error } = useContext(GlobalContext);
  const [title, setTitle] = useState(thread.title);
  const [content, setContent] = useState(thread.content);
  const [editMode, setEditMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const editValidation = () => {
    let setError = false;

    console.log(title, content);

    if (thread.title === title && thread.content === content) {
      console.log("HELLOOO");
      setErrorMsg("You must edit the fields");
      setError = true;
    }

    if (title.trim().length < 1 || content.trim().length < 1) {
      console.log("HELLOOO");
      setErrorMsg("Enter your title and describe your question");
      setError = true;
    }

    if (!setError) {
      setErrorMsg("");
    }

    return setError;
  };

  const handleEditButton = async (e) => {
    e.preventDefault();

    if (!editValidation()) {
      const result = await handleApiRequest({
        endpoint: "/api/question/put/",
        id: thread.threadId,
        method: "PUT",
        body: { title, content },
        errMsg: "Failed to update thread",
      });

      if (result) fetchThread();

      setEditMode(false);
    }
  };

  return (
    <article className="clicked-question">
      {error && <Error error={error} />}

      {!editMode && (
        <QuestionDefaultMode
          thread={thread}
          title={title}
          content={content}
          handleDeleteThread={handleDeleteThread}
          toggleEditMode={toggleEditMode}
        />
      )}

      {editMode && (
        <QuestionEditMode
          thread={thread}
          handleEditButton={handleEditButton}
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          toggleEditMode={toggleEditMode}
          handleDeleteThread={handleDeleteThread}
          errorMsg={errorMsg}
        />
      )}
    </article>
  );
}
