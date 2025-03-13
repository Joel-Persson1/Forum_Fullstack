import { Link } from "react-router-dom";
import { useTimeAgo } from "../hooks/useTimeAgo";

export function Question({ data }) {
  const formattedTime = useTimeAgo(data.thread_created_at, data.last_answer_at);

  return (
    <Link className="link" to={`question/${data.threadId}`}>
      <article className="question-box">
        <p>{`${data.reply_count} answers`}</p>

        <div className="question-content-box">
          <div>
            <h3 className="question-title">{data.title}</h3>
            <p className="question-content">{data.content}</p>
          </div>
          <div className="question-category-time">
            <span className="question-category">{data.category}</span>
            <span>{`asked ${formattedTime}`}</span>
          </div>
        </div>
      </article>
      <hr />
    </Link>
  );
}
