import React from 'react';

const DataBox = ({ tempData, altitudeData, longitudeData, latitudeData }) => {
  const dataBoxStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    border: '1px solid white',
    padding: '20px',
    width: '75%',

    margin: '20px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '10px', // Rounded corners
    fontFamily: 'Roboto, sans-serif', // Roboto font
  };

  const dataEntryStyle = {
    width: '45%',
    margin: '10px',
    fontSize: 'larger',
  };

  const dataValueStyle = {
    marginLeft: '4px', // Adjust the spacing to your preference
  };

  return (
    <div style={dataBoxStyle}>
      <></>
      <div style={dataEntryStyle}>
        <b>Temperature:</b>{' '}
        <span style={dataValueStyle}>{tempData[0]?.temperature ?? 'N/A'}</span>
      </div>
      <div style={{ ...dataEntryStyle, justifyContent: 'flex-end' }}>
        {' '}
        {/* Right align for altitude */}
        <b>Altitude:</b>{' '}
        <span style={dataValueStyle}>
          {altitudeData[0]?.altitude ?? 'N/A'} m
        </span>
      </div>
      <div style={dataEntryStyle}>
        <b>Longitude:</b>{' '}
        <span style={dataValueStyle}>
          {longitudeData[0]?.longitude ?? 'N/A'}
        </span>
      </div>
      <div style={{ ...dataEntryStyle, justifyContent: 'flex-end' }}>
        {' '}
        {/* Right align for latitude */}
        <b>Latitude:</b>{' '}
        <span style={dataValueStyle}>{latitudeData[0]?.latitude ?? 'N/A'}</span>
      </div>
    </div>
  );
};

export default DataBox;
