import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/">
      <img className="logo" src="./ThinkThank.png" alt="Logo" />
    </Link>
  );
}
