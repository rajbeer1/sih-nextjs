'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';
import './ResultsPage.css';

const ResultPage = () => {
  const token = Cookies.get('token');
  const [image, setImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [resultData, setResultData] = useState({});
  const [otherParams, setOtherParams] = useState({});

  const handleSOSClick = async () => {
    try {
      const response = await axios.post(
        'http://4.227.178.188:3001/sos/send',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.email) {
        setShowPopup(true);
      }
    } catch (err) {
      console.error('Error in sending SOS:', err);
    }
  };

  const getdata = async () => {
    try {
      const response = await axios.get(
        'http://4.227.178.188:3001/data/photo/get'
      );
      const data = response.data.data;
      setImage(data.image_url);
      const mlDetail = JSON.parse(data.ml_detail);
      setResultData({
        Confidence: mlDetail.Confidence,
        'Linear Regression Prediction':
          mlDetail['Linear Regression Prediction'],
        'Predicted Grade': mlDetail['Predicted Grade'],
      });
      setOtherParams(mlDetail['Other Parameters']);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

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
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#8884d8')}
            onMouseLeave={(e) => (e.target.style.color = 'white')}
          >
            Home
          </button>
        </Link>
        <Link href="https://miner-map.vercel.app/">
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
            Miner-map
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

      <div className="container">
        <div className="image-container">
          <img src={image} alt="Data Visualization" />
        </div>
        <div className="data-box">
          <h2 className="heading">Result Data</h2>
          <div className="data-container">
            {Object.entries(resultData).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
            <h3>Other Parameters</h3>
            {Object.entries(otherParams).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
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
  );
};

const headerStyle = {
  backgroundColor: 'black',
  paddingTop: '20px',
  paddingBottom: '20px',
  borderBottom: '2px solid #8884d8',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const buttonStyle = {
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  fontWeight: 'bold',
  padding: '10px 20px',
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
  transition: 'all 0.3s ease-in-out',
};

const popupContentStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '40px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  fontSize: '20px',
  textAlign: 'center',
  width: '50%',
  maxWidth: '600px',
  transition: 'all 0.3s ease-in-out',
};

export default ResultPage;
