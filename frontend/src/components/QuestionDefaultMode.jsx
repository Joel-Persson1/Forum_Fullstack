import { Trash, Pencil } from "lucide-react";
import { useTimeAgo } from "../hooks/useTimeAgo";

export function QuestionDefaultMode({
  thread,
  title,
  content,
  handleDeleteThread,
  toggleEditMode,
}) {
  const { formattedCreatedAt } = useTimeAgo(thread.created_at);

  return (
    <>
      <div>{`-${formattedCreatedAt}`}</div>
      <div className="flex">
        <h1>{title}</h1>
        <div className="btn-box">
          <button className="button" onClick={() => handleDeleteThread()}>
            <Trash size={20} color="black" />
          </button>
          <button className="button" onClick={() => toggleEditMode()}>
            <Pencil size={20} color="black" />
          </button>
        </div>
      </div>
      <p>{content}</p>
    </>
  );
}
