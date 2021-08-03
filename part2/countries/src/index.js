import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { uuid } from "uuidv4";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [masterCountry, setMasterCountry] = useState([]);

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setMasterCountry(response.data);
    });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value);

    if (filterCountry) {
      const countShow = masterCountry.filter((country) =>
        country.name.toLowerCase().match(filterCountry.toLowerCase())
      )
        ? masterCountry.filter((country) =>
            country.name.toLowerCase().match(filterCountry.toLocaleLowerCase())
          )
        : masterCountry;

      setCountries(countShow);
    }
  };

  const CountryShow = (props) => {
    if (countries.length > 10) {
      return <div>Too many countries to list</div>;
    }

    if (countries.length === 1) {
      return (
        <div>
          <CountrySingle country={countries[0]} />
        </div>
      );
    }
    return (
      <>
        {countries.map((country) => (
          <Country key={uuid()} country={country} />
        ))}
      </>
    );
  };

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

  const Country = (props) => {
    return (
      <div>
        {props.country.name}
        <button onClick={() => setCountries([props.country])}>show</button>
      </div>
    );
  };

  return (
    <div>
      find countries
      <input value={filterCountry} onChange={handleFilterChange} />
      <CountryShow />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
