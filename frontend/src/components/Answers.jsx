import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Answer } from "./Answer";
import { Loader } from "./Loader";
import { Error } from "./Error";

export function Answers({ id }) {
  const { isLoading, handleApiRequest, error } = useContext(GlobalContext);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const data = await handleApiRequest({
      endpoint: "/api/answer/get/",
      id: id,
      errMsg: "Could not retrieve the answers to this question",
    });

    if (data) {
      setAnswers(data);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [id]);

  return (
    <div className="answers-div">
      <h2 className="answer-title">Answers</h2>

      {isLoading && <Loader />}

      {error && <Error error={error} />}

      {!isLoading &&
        answers.map((answer) => (
          <Answer
            data={answer}
            key={answer.answerId}
            fetchAnswers={fetchAnswers}
          />
        ))}
    </div>
  );
}
