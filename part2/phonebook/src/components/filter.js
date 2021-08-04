import React from "react";

const Filter = (props) => {
  return (
    <>
      filter show with:
      <input value={props.filterPerson} onChange={props.handleFilterChange} />
    </>
  );
};

export default Filter;
