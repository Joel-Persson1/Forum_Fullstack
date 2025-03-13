import { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export function AnswerQuestion({ id }) {
  const { handleApiRequest } = useContext(GlobalContext);
  const inputAnswer = useRef();
  const contributor = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!inputAnswer.current || !contributor.current) return;

    const result = {
      content: inputAnswer.current.value,
      contributor: contributor.current.value,
    };

    handleApiRequest({
      endpoint: `/api/answer/post/${id}`,
      method: "POST",
      body: result,
      errMsg: "failed to post your answer",
    });

    inputAnswer.current.value = "";
    contributor.current.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3>Your Answer</h3>
      <input type="text" ref={contributor} placeholder="Your Name" />
      <textarea ref={inputAnswer} placeholder="Write your answer here..." />
      <button type="submit">Post Answer</button>
    </form>
  );
}
