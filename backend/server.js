const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint 1: Get Available Countries
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Endpoint 2: Get Country Info
app.get('/api/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params;

  try {
    const borderCountries = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    const populationData = await axios.get(`https://countriesnow.space/api/v0.1/countries/population/cities`, {
      params: {
        country: countryCode
      }
    });
    const flagData = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`, {
      params: {
        country: countryCode
      }
    });

    res.json({
      borderCountries: borderCountries.data,
      populationData: populationData.data,
      flagUrl: flagData.data
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country info' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
