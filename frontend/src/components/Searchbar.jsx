import { useSearch } from "../context/SearchContextProvider";

export function Searchbar() {
  const { setSearchTerm } = useSearch();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      className="searchbar"
      type="text"
      placeholder="Search threads..."
      onChange={handleSearchChange}
    />
  );
}
