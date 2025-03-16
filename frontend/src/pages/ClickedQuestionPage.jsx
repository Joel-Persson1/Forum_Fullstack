import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContextProvider";

import { QuestionById } from "../components/QuestionById";
import { Answers } from "../components/Answers";
import { AnswerQuestion } from "../components/AnswerQuestion";

export function ClickedQuestionPage() {
  const navigate = useNavigate();
  const { handleApiRequest, isLoading, error } = useContext(GlobalContext);
  const { id } = useParams();

  const [thread, setThread] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(false);

  const getThread = () => {
    handleApiRequest({
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
      setDeleteMessage(true);
      setThread(null);

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  return (
    <section className="section">
      {isLoading && <div className="loader"></div>}

      {error && <p className="error-box">{error}</p>}

      {deleteMessage && (
        <p className="success-message">The thread was deleted!</p>
      )}

      {!isLoading && thread === null && !error && !deleteMessage && (
        <p className="no-result-box">No thread found.</p>
      )}

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
    </section>
  );
}
