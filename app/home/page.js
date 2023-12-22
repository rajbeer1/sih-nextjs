'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './ResultsPage.css'; // Import the CSS file
import {
  FaPercentage,
  FaBalanceScale,
  FaWater,
  FaSeedling,
} from 'react-icons/fa';
import Link from 'next/link';

const icons = {
  'Iron Feed Percentage': <FaSeedling />,
  'Silica Feed Percentage': <FaBalanceScale />,
  'Ore Pulp PH': <FaWater />,
  'Percentage Silica Concentrate': <FaPercentage />,
};

const ResultPage = () => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const token = Cookies.get('token');
  const [image, setImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [sos, setsos] = useState('');
  const [form, setForm] = useState(null);
  const handleSOSClick = async () => {
    try {
      const response = await axios.post(
        'http://4.227.178.188:3001/sos/send',
        {}, // Request body (if any)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      if (response.data.email) {
        setShowPopup(true);
      }
    }catch(err){}
  };

  const getdata = async () => {
    try {
      const response = await axios.get(
        'http://4.227.178.188:3001/data/photo/get'
      );
      setImage(response.data.data.image_url);
      setForm(response.data.data.ml_detail);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function waitForThreeSeconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 1000);
    });
  }

  waitForThreeSeconds().then((message) => console.log(message));

  function convertToResultData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      const feedData = data.feed_data[0];
      const prediction = data.predictions[0];
      return {
        'Iron Feed Percentage': feedData[0],
        'Silica Feed Percentage': feedData[1],
        'Ore Pulp PH': feedData[5],
        'Percentage Silica Concentrate': prediction,
      };
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {};
    }
  }

  const resultData = form ? convertToResultData(form) : {};
useEffect(() => {
  getdata()
}, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: 'black',
          paddingTop: '20px',
          paddingBottom: '20px',
          borderBottom: '2px solid #8884d8',
        }}
      >
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
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#8884d8')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
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
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#8884d8')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
            >
              Data
            </button>
          </Link>
          <Link href="/map">
            <button
              style={{
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#8884d8')}
              onMouseLeave={(e) => (e.target.style.color = 'white')}
            >
              Map
            </button>
          </Link>
          <button
            style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              padding: 10,
              fontSize: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#8884d8')}
            onMouseLeave={(e) => (e.target.style.color = 'white')}
            onClick={handleSOSClick}
          >
            Send SOS
          </button>
        </div>
      </div>
      <div className="container">
        <div className="image-container">
          <img src={image} alt="Data Visualization" />
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
        {showPopup && (
          <div style={popupStyle}>
            <div style={popupContentStyle}>
              <p>SOS Sent</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  transition: 'all 0.3s ease-in-out', // Smooth transition for the overlay
};

// Styles for the popup content
const popupContentStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '40px', // Increased padding for larger size
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  fontSize: '20px',
  textAlign: 'center',
  width: '50%', // Larger width
  maxWidth: '600px', // Maximum width
  transition: 'all 0.3s ease-in-out', // Smooth transition for the content
};
export default ResultPage;
