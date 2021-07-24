import React from "react";

const Filter = (props) => {
  return (
    <>
      <p>filter show with: </p>
      <input value={props.filterPerson} onChange={props.handleFilterChange} />
    </>
  );
};

export default Filter;
