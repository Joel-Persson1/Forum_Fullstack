export function SortCategorySelects({
  sortType,
  setSortType,
  category,
  setCategory,
}) {
  return (
    <div className="sort-filter-div">
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="" disabled hidden>
          Sort By
        </option>
        <option value="newest">Newest</option>
        <option value="most_replies">Most Replies</option>
        <option value="time">Latest Activity</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" disabled hidden>
          Category
        </option>
        <option value="all">All</option>
        <option value="coding">Coding</option>
        <option value="cooking">Cooking</option>
        <option value="sports">Sports</option>
      </select>
    </div>
  );
}
