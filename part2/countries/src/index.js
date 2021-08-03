import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Filter from "./components/Filter";
import CountryShow from "./components/CountryShow";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [masterCountry, setMasterCountry] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setMasterCountry(response.data);
    });
  }, []);

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

  return (
    <div>
      <Filter value={filterCountry} onChange={handleFilterChange} />
      <CountryShow countries={countries} setCountries={setCountries} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
