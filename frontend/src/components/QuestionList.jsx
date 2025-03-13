import { useContext, useEffect, useState } from "react";
import { Question } from "./Question";
import { GlobalContext } from "../context/GlobalContextProvider";
import { useSearch } from "../context/SearchContextProvider";
import { LabelContainer } from "./LabelContainer";

export function QuestionList() {
  const { isLoading, handleApiRequest, error } = useContext(GlobalContext);
  const { searchTerm } = useSearch();

  const [threads, setThreads] = useState([]);
  const [sortType, setSortType] = useState("newest");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    handleApiRequest({
      endpoint: `/api/threads?category=${category}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,
      errMsg: "failed to get threads",
    }).then((data) => setThreads(data || []));
  }, [category, sortType, searchTerm]);

  const sortThreads = (threads, sortType) => {
    return [...threads].sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "most_replies":
          return b.reply_count - a.reply_count;
        case "time": {
          const aLastActivity = a.last_answer_at
            ? new Date(a.last_answer_at)
            : new Date(a.thread_created_at);
          const bLastActivity = b.last_answer_at
            ? new Date(b.last_answer_at)
            : new Date(b.thread_created_at);
          return bLastActivity - aLastActivity;
        }
        default:
          return 0;
      }
    });
  };

  return (
    <section>
      <LabelContainer
        sortType={sortType}
        setSortType={setSortType}
        category={category}
        setCategory={setCategory}
      />

      {error && <p>{error}</p>}

      {isLoading && <p>Loading...</p>}

      {!isLoading && !error && threads.length === 0 && (
        <p>No threads matched</p>
      )}

      {!isLoading &&
        threads.length > 0 &&
        sortThreads(threads, sortType).map((thread) => (
          <Question data={thread} key={thread.threadId} />
        ))}
    </section>
  );
}
