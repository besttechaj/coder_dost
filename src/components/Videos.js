import React from 'react';

//destructuring props
const Videos = ({ title, img, verified, children }) => {
  console.log('render videos component');
  return (
    <div
      className='container'
      style={{
        border: '2px solid blue',
        width: '250px',
        padding: '5px',
        margin: '3px',
        height: '180px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'red',
        color: 'white',
      }}
    >
      <div className='pic' style={{ width: '20%', marginBottom: '2px' }}>
        <img
          src={img}
          alt='pic'
          style={{ width: '15rem', height: '100px', marginBottom: '2px' }}
        />
      </div>
      <div className='title' style={{ marginBottom: '2px' }}>
        {title}
      </div>
      <div style={{ marginBottom: '2px' }}>{verified && '✅'}</div>
      <div>{children}</div>
    </div>
  );
};

export default Videos;
