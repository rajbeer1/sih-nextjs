'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import Link from "next/link";
import DataBox from "./databox";
import Linegraph from "./linegraph";
import Cookies from 'js-cookie';
export default function () {
  const [tempdata, settemp] = useState([]);
  const [altdata, setaltdata] = useState([]);
  const [latdata, setlatdata] = useState([]);
  const [lngdata, setlngdata] = useState([]);

  const token = Cookies.get('token');
  const [showPopup, setShowPopup] = useState(false);

  const gettemp = async () => {
    try {
      const response = await axios.get(
        `http://4.227.178.188:3001/data/temperature?limit=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tempData = response.data.map((item, index) => ({
        name: String(index + 1),
        temperature: item.temperature.toFixed(4),
      }))
      settemp(tempData);
      console.log(tempData);
    
      

    }
     catch (err) {
      console.log(err);
    }
  ;
  }
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
    } catch (err) {}
  };
  const getlng = async () => {
    try {
      const response = await axios.get(
        `http://4.227.178.188:3001/data/longitude?limit=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tempData = response.data.map((item, index) => ({
        name: String(index + 1),
        longitude: item.longitude,
      }));
      setlngdata(tempData);
      console.log(tempData);
    } catch (err) {
      console.log(err);
    }
  };
  const getlat = async () => {
    try {
      const response = await axios.get(
        `http://4.227.178.188:3001/data/latitude?limit=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tempData = response.data.map((item, index) => ({
        name: String(index + 1),
        latitude: item.latitude,
      }));
      setlatdata(tempData);
      console.log(tempData);
    } catch (err) {
      console.log(err);
    }
  };
  const getalt = async () => {
    try {
      const response = await axios.get(
        `http://4.227.178.188:3001/data/altitude?limit=15`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const tempData = response.data.map((item, index) => ({
        name: String(index + 1),
        altitude: item.altitude.toFixed(4),
      }));
      setaltdata(tempData);
      console.log(tempData);
    } catch (err) {
      console.log(err);
    }
  };
  const refresh = () => {
    getalt();
    gettemp();
    getlat();
    getlng();
    
  }
  useEffect(() => {
    refresh();
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
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center', // Centers vertically
          height: '30vh', // Takes the full height of the viewport
          backgroundColor: 'black',
        }}
      >
        <DataBox
          altitudeData={altdata}
          latitudeData={latdata}
          tempData={tempdata}
          longitudeData={lngdata}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Linegraph datas={lngdata} datakey="longitude" strokeColor="#ff6347" />{' '}
        <Linegraph datas={latdata} datakey="latitude" strokeColor="#1e90ff" />{' '}
      </div>
      {showPopup && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <p>SOS Sent</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: 'black',
        }}
      >
        <Linegraph
          datas={tempdata}
          datakey="temperature"
          strokeColor="#32cd32"
        />{' '}
        <Linegraph datas={altdata} datakey="altitude" strokeColor="#daa520" />{' '}
      </div>
    </div>
  );
}
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