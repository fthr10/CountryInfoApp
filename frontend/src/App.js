import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import Details from './components/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/details/:countryCode" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
