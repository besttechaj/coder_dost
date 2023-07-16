import React from 'react';
import './Video.css';
//destructuring props
const Videos = ({ id, title, img, verified, children, deleteVideo }) => {
  console.log('render videos component');
  return (
    <div className='container'>
      <button className='close' onClick={() => deleteVideo(id)}>
        X
      </button>
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
