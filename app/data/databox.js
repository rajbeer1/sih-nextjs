'use client'
import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import styles from './DataBox.module.css';



const DataBox = ({  altitudeData,tempData, longitudeData, latitudeData }) => {
  return (
    <div className={styles.dataBox}>
      <div className={styles.dataEntry}>
        <b>Temperature:</b>{' '}
        <span className={styles.dataValue}>
          {tempData[0]?.temperature ?? 'N/A'}
        </span>
      </div>
      <div className={`${styles.dataEntry} ${styles.rightAligned}`}>
        <b>Altitude:</b>{' '}
        <span className={styles.dataValue}>
          {altitudeData[0]?.altitude ?? 'N/A'} m
        </span>
      </div>
      <div className={styles.dataEntry}>
        <b>Longitude:</b>{' '}
        <span className={styles.dataValue}>
          {longitudeData[0]?.longitude ?? 'N/A'}
        </span>
      </div>
      <div className={`${styles.dataEntry} ${styles.rightAligned}`}>
        <b>Latitude:</b>{' '}
        <span className={styles.dataValue}>
          {latitudeData[0]?.latitude ?? 'N/A'}
        </span>
      </div>
    </div>
  );
};

DataBox.propTypes = {
  tempData: PropTypes.array,
  altitudeData: PropTypes.array,
  longitudeData: PropTypes.array,
  latitudeData: PropTypes.array,
};

export default DataBox;
