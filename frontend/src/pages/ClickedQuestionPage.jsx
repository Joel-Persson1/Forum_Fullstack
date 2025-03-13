import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContextProvider";

import { QuestionById } from "../components/QuestionById";
import { Answers } from "../components/Answers";
import { AnswerQuestion } from "../components/AnswerQuestion";

export function ClickedQuestionPage() {
  const { handleApiRequest, isLoading, error } = useContext(GlobalContext);
  const { id } = useParams();

  const [thread, setThread] = useState(null);

  const getThread = () => {
    const data = handleApiRequest({
      endpoint: "/api/threads/",
      id: id,
      errMsg: "Failed to fetch thread",
    }).then((data) => setThread(data));
  };

  useEffect(() => {
    getThread();
  }, []);

  const handleDeleteThread = async () => {
    const result = await handleApiRequest({
      endpoint: "/api/thread/delete/",
      id: id,
      method: "DELETE",
      errMsg: "Could not delete thread",
    });

    if (result) {
      alert(result.message);
      setThread(null);
    }
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && thread === null && !error && <p>No thread found.</p>}

      {!isLoading && thread && (
        <>
          <QuestionById
            thread={thread}
            handleDeleteThread={handleDeleteThread}
            fetchThread={getThread}
          />
          <Answers id={id} />
          <AnswerQuestion id={id} />
        </>
      )}
    </>
  );
}
