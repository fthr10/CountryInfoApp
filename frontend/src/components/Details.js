import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import PopulationChart from './PopulationChart';
import './css/details.css';

const Details = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [neighboringCountries, setNeighboringCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        const selectedCountry = data.find(
          (country) => country.cca3 === countryCode
        );
        if (selectedCountry) {
          setCountry(selectedCountry);
          const neighborCodes = selectedCountry.borders || [];
          const neighbors = neighborCodes.map((borderCode) =>
            data.find((item) => item.cca3 === borderCode)
          );
          setNeighboringCountries(neighbors);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [countryCode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!country) return <p>Loading country details...</p>;

  return (
    <div>
      <button className="home-button" onClick={() => navigate('/')}>
        Home
      </button>

      <h1>{country.name.common}</h1>
      <img
        src={country.flags.png}
        alt={country.name.common}
        width="120"
        height="100"
      />
      <p>Country Code: {country.cca3}</p>
      <p>Population: {new Intl.NumberFormat('de-DE').format(country.population)}</p>

      <h2>Border Countries:</h2>
      <ul>
        {neighboringCountries.map((neighbor) => (
          <li key={neighbor.cca3}>
            <Link to={`/details/${neighbor.cca3}`}>
              <img
                src={neighbor.flags.png}
                alt={neighbor.name.common}
                width="50"
                height="40"
              />
              {neighbor.name.common}
            </Link>
          </li>
        ))}
      </ul>

      <PopulationChart countryCode={country.name.common} />


      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default Details;
