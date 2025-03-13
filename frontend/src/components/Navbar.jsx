import { Logo } from "./Logo";
import { Searchbar } from "./Searchbar";
import { AddQuestionButton } from "./AddQuestionButton";

export function Navbar() {
  return (
    <nav className="nav">
      <Logo />
      <Searchbar />
      <AddQuestionButton />
    </nav>
  );
}
