import React from "react";

const CountrySingle = (props) => {
  return (
    <>
      <h2>{props.country.name}</h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
        {props.country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={props.country.flag}
        alt="Flag of country"
        width="150"
        height="150"
      />
    </>
  );
};
export default CountrySingle;
