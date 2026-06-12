import { Link } from "react-router-dom";
import { uploadPath } from "../../config";

const SearchBar = ({ search, setSearch, data, isError, isLoading }) => {
  const trimmedSearch = search.trim();
  const shouldShowResults = trimmedSearch.length > 1;
  const hasResults = Array.isArray(data) && data.length > 0;

  return (
    <>
      <input
        className="searchInput"
        type="search"
        placeholder="Search students by name or CGPA"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {shouldShowResults && (
        <div className="searchResults" role="listbox">
          {isLoading ? (
            <div className="searchEmpty" role="status">
              Searching...
            </div>
          ) : isError ? (
            <div className="searchEmpty" role="status">
              Search unavailable
            </div>
          ) : hasResults ? (
            data.map((item) => (
              <Link
                className="searchResultItem"
                key={item.id}
                onClick={() => setSearch("")}
                role="option"
                to={`/profile/${item.id}`}
              >
                <img
                  className="searchResultAvatar"
                  src={uploadPath(item.user_profile_img)}
                  alt={item.user_fullname}
                />
                <span>
                  <strong>{item.user_fullname}</strong>
                  <small>
                    {item.user_name}
                    {item.student_cgpa ? ` · CGPA ${item.student_cgpa}` : ""}
                  </small>
                </span>
              </Link>
            ))
          ) : (
            <div className="searchEmpty" role="status">
              No students found
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
