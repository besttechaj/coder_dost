import React, { useContext } from 'react';
import './Video.css';
import { ThemeContext } from '../context/ThemeContext';
import VideoDispatchContext from '../context/VideoDispatchContext';
//destructuring props
const Videos = ({ id, title, img, verified, children, editVideo }) => {
  console.log('render videos component');

  const theme = useContext(ThemeContext);
  const dispatch = useContext(VideoDispatchContext);
  return (
    <div className={`container ${theme}`}>
      <button
        className={`close ${theme}`}
        onClick={() => dispatch({ type: 'DELETE', payload: id })}
      >
        X
      </button>
      <button className={`edit ${theme}`} onClick={() => editVideo(id)}>
        edit
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
