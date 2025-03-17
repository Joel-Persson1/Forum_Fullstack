import { Trash, Check, X } from "lucide-react";

export function AnswerEditMode({
  handleEditButton,
  contributor,
  setContributor,
  content,
  setContent,
  toggleEditMode,
  handleDeleteAnswer,
  errorMsg,
  data,
}) {
  const handleCloseEditMode = () => {
    setContent(data.answerContent);
    setContributor(data.contributor);

    toggleEditMode();
  };

  return (
    <form className="title-btn-box" onSubmit={handleEditButton}>
      <div className="edit-title-content-box">
        <p className="error-paragraf">{errorMsg}</p>
        <input
          className="inputField"
          type="text"
          value={contributor}
          onChange={(e) => setContributor(e.target.value)}
        />

        <textarea
          className="inputField"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="btn-box">
        <button className="button" onClick={() => handleCloseEditMode()}>
          <X size={20} color="black" />
        </button>
        <button className="button" onClick={() => handleDeleteAnswer()}>
          <Trash size={20} color="black" />
        </button>
        <button className="button" type="submit">
          <Check size={20} color="black" />
        </button>
      </div>
    </form>
  );
}
