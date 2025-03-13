import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  const values = {
    searchTerm,
    setSearchTerm,
  };

  return (
    <SearchContext.Provider value={values}>{children}</SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
