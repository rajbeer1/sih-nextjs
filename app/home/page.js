import React from 'react';
import './ResultsPage.css'; // Import the CSS file
import {
  FaPercentage,
  FaBalanceScale,
  FaWater,
  FaSeedling,
} from 'react-icons/fa';
import Link from 'next/link';

const resultData = {
  'Iron Feed Percentage': 55.17,
  'Silica Feed Percentage': 14.35,
  'Ore Pulp PH': 9.48686,
  'Percentage Silica Concentrate': 4.9,
};

const icons = {
  'Iron Feed Percentage': <FaSeedling />,
  'Silica Feed Percentage': <FaBalanceScale />,
  'Ore Pulp PH': <FaWater />,
  'Percentage Silica Concentrate': <FaPercentage />,
};

const imageUri =
  'http://res.cloudinary.com/ds90zherj/image/upload/v1703162022/q4unfqssb7yysqh5pc3m.jpg';

const ResultPage = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Link href="/home">
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              fontSize: '20px',
            }}
          >
            Home
          </button>
        </Link>
        <Link href="/data">
          <button
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              fontSize: '20px',
            }}
          >
            Data
          </button>
        </Link>
      </div>
      <div className="container">
        <div className="image-container">
          <img src={imageUri} alt="Descriptive Alt Text" />
        </div>
        <div className="data-box">
          <h2 className="heading">Result Data</h2>
          <div className="data-container">
            {Object.entries(resultData).map(([key, value]) => (
              <p key={key}>
                <span className="icon">{icons[key]}</span>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
