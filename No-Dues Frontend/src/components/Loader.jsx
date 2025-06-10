import React from 'react';
import Lottie from 'react-lottie';
import gearLoaderData from './atom-loader.json'; // Path to your JSON file

const GearLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: gearLoaderData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        cursor: 'none'
    }}>
      <Lottie 
        options={defaultOptions}
        height={400} // Adjust as needed
        width={400} // Adjust as needed
      />
    </div>
  );
};

export default GearLoader;
