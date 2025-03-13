export function LabelContainer(sortType, setSortType, category, setCategory) {
  return (
    <div className="sort-filter-div">
      <label>
        Sort By :
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="most_replies">Most Replies</option>
          <option value="time">Latest Activity</option>
        </select>
      </label>
      <label>
        Category :
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="coding">Coding</option>
          <option value="cooking">Cooking</option>
          <option value="sports">Sports</option>
        </select>
      </label>
    </div>
  );
}
