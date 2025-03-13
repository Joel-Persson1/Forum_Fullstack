import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";
import { Answer } from "./Answer";

export function Answers({ id }) {
  const { isLoading, handleApiRequest } = useContext(GlobalContext);
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const data = await handleApiRequest({
      endpoint: "/api/answer/get/",
      id: id,
      errMsg: "Could not retrieve the answers to this question",
    });

    console.log(data);

    if (data) {
      setAnswers(data);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [id]);

  return (
    <div>
      <h2>Answers</h2>
      {isLoading && <p>Loading...</p>}
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
