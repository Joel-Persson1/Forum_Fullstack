import { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContextProvider";

export function AnswerQuestion({ id }) {
  const { handleApiRequest, error } = useContext(GlobalContext);
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
    <form className="form-section form" onSubmit={handleOnSubmit}>
      {error && <p>{error}</p>}

      <h3>Your Answer</h3>
      <input
        className="input"
        type="text"
        ref={contributor}
        placeholder="Your Name"
      />
      <textarea
        className="textarea"
        ref={inputAnswer}
        placeholder="Write your answer here..."
      />
      <button type="submit">Post Answer</button>
    </form>
  );
}
