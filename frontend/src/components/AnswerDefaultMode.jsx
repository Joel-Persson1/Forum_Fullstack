import { Trash, Pencil } from "lucide-react";

export function AnswerDefaultMode({
  data,
  handleDeleteAnswer,
  toggleEditMode,
}) {
  return (
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
  );
}
