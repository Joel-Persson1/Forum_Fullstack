import { Link } from "react-router-dom";

export function AddQuestionButton() {
  return (
    <Link className="btn" to="/app/question">
      Ask Question
    </Link>
  );
}
