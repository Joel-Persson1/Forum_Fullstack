import { Trash, Check, X } from "lucide-react";

export function QuestionEditMode({
  thread,
  handleEditButton,
  title,
  setTitle,
  content,
  setContent,
  toggleEditMode,
  handleDeleteThread,
  errorMsg,
}) {
  const handleCloseEditMode = () => {
    setTitle(thread.title);
    setContent(thread.content);

    toggleEditMode();
  };

  return (
    <form className="edit-form-box" onSubmit={handleEditButton}>
      <div>
        <p className="error-paragraf">{errorMsg}</p>
        <input
          className="edit-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="edit-textarea-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="btn-box">
        <button className="button" onClick={() => handleCloseEditMode()}>
          <X size={20} color="black" />
        </button>
        <button className="button" onClick={() => handleDeleteThread()}>
          <Trash size={20} color="black" />
        </button>
        <button className="button" type="submit">
          <Check size={20} color="black" />
        </button>
      </div>
    </form>
  );
}
