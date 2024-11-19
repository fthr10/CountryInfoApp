import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/countryList.css';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json(); 
      setCountries(data);
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (countryCode) => {
    navigate(`/details/${countryCode}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.cca3} onClick={() => handleCountryClick(country.cca3)} style={{ cursor: 'pointer' }}>
            <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '50px', marginRight: '10px' }} />
            {country.name.common}
          </li>
        ))}
      </ul>


      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </div>
  );
};

export default CountryList;
