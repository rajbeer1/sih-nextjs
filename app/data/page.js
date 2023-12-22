'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Linegraph from './linegraph';
import DataBox from './databox';
import Link from 'next/link';

const DataPage = () => {
  const [lng, setLng] = useState([]);

  const lngDataFetch = async () => {
    try {
      const response = await axios.get(
        'http://4.227.178.188:3001/data/latitude?limit=15'
      );
      setLng(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error appropriately
    }
  };

  useEffect(() => {
    console.log(lng); // This will log when lng is updated
  }, [lng]); // Dependency array ensures this runs when lng changes

  const lngdata = [
    { name: '1', longitude: '78.5000' },
    { name: '2', longitude: '78.4696' },
    { name: '3', longitude: '78.4772' },
    { name: '4', longitude: '78.4716' },
    { name: '5', longitude: '78.5040' },
    { name: '6', longitude: '78.4701' },
    { name: '7', longitude: '78.4363' },
    { name: '8', longitude: '78.4858' },
    { name: '9', longitude: '78.4592' },
    { name: '10', longitude: '78.4626' },
    { name: '11', longitude: '78.4873' },
    { name: '12', longitude: '78.4958' },
    { name: '13', longitude: '78.4068' },
    { name: '14', longitude: '78.4703' },
    { name: '15', longitude: '78.4784' },
  ];
  const latdata = [
    { name: '1', latitude: '17.3696' },
    { name: '2', latitude: '17.3547' },
    { name: '3', latitude: '17.4290' },
    { name: '4', latitude: '17.4195' },
    { name: '5', latitude: '17.4039' },
    { name: '6', latitude: '17.4258' },
    { name: '7', latitude: '17.3693' },
    { name: '8', latitude: '17.4086' },
    { name: '9', latitude: '17.3372' },
    { name: '10', latitude: '17.3740' },
    { name: '11', latitude: '17.3927' },
    { name: '12', latitude: '17.3893' },
    { name: '13', latitude: '17.3896' },
    { name: '14', latitude: '17.3800' },
    { name: '15', latitude: '17.3550' },
  ];
  const tempdata = [
    { name: '1', temperature: '25.1724' },
    { name: '2', temperature: '25.1953' },
    { name: '3', temperature: '25.1994' },
    { name: '4', temperature: '25.2125' },
    { name: '5', temperature: '25.1525' },
    { name: '6', temperature: '25.1508' },
    { name: '7', temperature: '25.1900' },
    { name: '8', temperature: '25.1829' },
    { name: '9', temperature: '25.1753' },
    { name: '10', temperature: '25.2500' },
    { name: '11', temperature: '25.1983' },
    { name: '12', temperature: '25.2044' },
    { name: '13', temperature: '25.1589' },
    { name: '14', temperature: '25.1574' },
    { name: '15', temperature: '25.2411' },
  ];
  const altdata = [
    { name: '1', altitude: '423.4325' },
    { name: '2', altitude: '426.1713' },
    { name: '3', altitude: '428.5139' },
    { name: '4', altitude: '424.2229' },
    { name: '5', altitude: '432.3831' },
    { name: '6', altitude: '422.6114' },
    { name: '7', altitude: '422.9918' },
    { name: '8', altitude: '425.9101' },
    { name: '9', altitude: '428.9033' },
    { name: '10', altitude: '426.6017' },
    { name: '11', altitude: '428.9779' },
    { name: '12', altitude: '433.3327' },
    { name: '13', altitude: '432.3228' },
    { name: '14', altitude: '434.7111' },
    { name: '15', altitude: '440.9115' },
  ];

  return (
    <div style={{ backgroundColor: 'black' }}>
      <button onClick={lngDataFetch}>rhd</button>
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

      <DataBox
        tempData={tempdata}
        altitudeData={altdata}
        latitudeData={latdata}
        longitudeData={lngdata}
      />
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
};

export default DataPage;
