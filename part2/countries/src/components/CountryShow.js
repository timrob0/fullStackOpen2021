import React from "react";
import CountrySingle from "./CountrySingle";

const CountryShow = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return <div>Too many countries to list</div>;
  } else if (
    (countries.length > 2 && countries.length < 10) ||
    countries.length === 0
  ) {
    console.log("Hello");
    return (
      <>
        {countries.map((country, i) => (
          <li key={i}>
            {" "}
            {country.name}{" "}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </>
    );
  } else
    return (
      <>
        <CountrySingle country={countries[0]} />
      </>
    );
};

export default CountryShow;
