import { Link } from "react-router-dom";

import { useTimeAgo } from "../hooks/useTimeAgo";
export function Question({ data }) {
  const { formattedCreatedAt, formattedUpdatedAt } = useTimeAgo(
    data.thread_created_at,
    data.updated_at
  );

  return (
    <Link className="link" to={`question/${data.threadId}`}>
      <article className="question-box">
        <div className="answer-preview">{`${data.reply_count} answers`}</div>

        <div className="question-content-box">
          <div>
            <h3 className="question-title">{data.title}</h3>
            <p className="question-content">
              {data.content.length > 100
                ? `${data.content.substring(0, 100)}...`
                : data.content}
            </p>
          </div>
          <div className="question-category-time">
            <span className="question-category">{data.category}</span>
            <span>{`asked ${formattedCreatedAt}`}</span>
            {formattedUpdatedAt && (
              <span>{`updated ${formattedUpdatedAt}`}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
