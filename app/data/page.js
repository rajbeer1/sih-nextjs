'use client'
import axios from "axios";
import { useEffect, useState } from "react"
import Link from "next/link";
import DataBox from "./databox";
import Linegraph from "./linegraph";
export default function () {
  const [tempdata, settemp] = useState([]);
  const [altdata, setaltdata] = useState([]);
  const [latdata, setlatdata] = useState([]);
  const [lngdata, setlngdata] = useState([]);

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
  const token = getCookie('token')

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
        {' '}
        {/* Add a purple bottom border */}
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