import React, { useState, useEffect } from "react";
import axios from "axios";

const CountrySingle = (props) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: props.country.capital,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((response) => {
        const apiResponse = response.data;
        console.log(apiResponse);
        console.log(
          `Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`
        );
        setWeather([apiResponse]);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (weather.length > 0) {
    const currentWeather = weather[0].current;
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
        <h2>Weather in {props.country.capital}</h2>
        <p>temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>
          wind: {currentWeather.wind_speed} mph direction{" "}
          {currentWeather.wind_dir}
        </p>
      </>
    );
  }

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
