import React, { Component } from "react";
import ReactSearchBox from "react-search-box";

const SearchBar = ({ search, setSearch, data }) => {
  return (
    <ReactSearchBox
      placeholder="Placeholder"
      value={search}
      
      data={data}
      onChange={(record) => setSearch(record)}
    //   callback={(record) => console.log(record)}
    />
  );
};

export default SearchBar;
