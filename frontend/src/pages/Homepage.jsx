import { QuestionList } from "../components/QuestionList";

export function Homepage() {
  return (
    <>
      <main className="homepage">
        <h1 className="header">Questions</h1>

        <QuestionList />
      </main>
    </>
  );
}
