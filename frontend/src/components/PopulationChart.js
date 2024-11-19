import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = ({ countryCode }) => {
  const [populationData, setPopulationData] = useState([]);
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    fetch(`https://countriesnow.space/api/v0.1/countries/population/`)
      .then(response => response.json())
      .then(data => {
        const countryData = data.data.find(
          (country) => country.country === countryCode
        );
        
        if (countryData) {
          const formattedData = countryData.populationCounts.map((item) => ({
            year: item.year,
            population: item.value
          }));
          setPopulationData(formattedData);
        }
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false); 
      });
  }, [countryCode]);

 
  if (loading) {
    return <p>Loading population data...</p>;
  }

 
  const chartData = {
    labels: populationData.map((item) => item.year),
    datasets: [
      {
        label: 'Population Growth',
        data: populationData.map((item) => item.population),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2>Population Growth Over Time</h2>
      {populationData.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>No population data available.</p>
      )}
    </div>
  );
};

export default PopulationChart;
