const SearchBar = ({ search, setSearch, data }) => {
  const listId = "studentbook-search-options";

  return (
    <>
      <input
        type="search"
        placeholder="Search..."
        value={search}
        list={listId}
        onChange={(event) => setSearch(event.target.value)}
      />
      <datalist id={listId}>
        {data?.map((item) => (
          <option key={item.key} value={item.value} />
        ))}
      </datalist>
    </>
  );
};

export default SearchBar;
