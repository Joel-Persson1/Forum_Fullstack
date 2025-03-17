import { useContext, useEffect, useState } from "react";
import { Question } from "./Question";
import { GlobalContext } from "../context/GlobalContextProvider";
import { useSearch } from "../context/SearchContextProvider";
import { SortCategorySelects } from "./SortCategorySelects";
import { Loader } from "./Loader";
import { Error } from "./Error";

export function QuestionList() {
  const { isLoading, handleApiRequest, error } = useContext(GlobalContext);
  const { searchTerm } = useSearch();

  const [threads, setThreads] = useState([]);
  const [sortType, setSortType] = useState("");
  const [category, setCategory] = useState("");

  const endpoint = `/api/threads?category=${category}${
    searchTerm ? `&search=${searchTerm}` : ""
  }&sortType=${sortType}`;

  useEffect(() => {
    handleApiRequest({
      endpoint: endpoint,
      errMsg: "failed to get threads",
    }).then((data) => setThreads(data || []));
  }, [category, sortType, searchTerm]);

  return (
    <section className="section">
      <SortCategorySelects
        sortType={sortType}
        setSortType={setSortType}
        category={category}
        setCategory={setCategory}
      />

      {error && <Error error={error} />}

      {isLoading && <Loader />}

      {!isLoading && !error && threads.length === 0 && (
        <p className="error-box">No threads found</p>
      )}

      {!isLoading && !error && threads.length > 0 && (
        <>
          {threads.length > 0 &&
            threads.map((thread) => (
              <Question data={thread} key={thread.threadId} />
            ))}
        </>
      )}
    </section>
  );
}
