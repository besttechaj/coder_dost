import React, { useContext } from 'react';
import './Video.css';
import { ThemeContext } from '../context/ThemeContext';
import useVideoDataDispatch from '../customHooks/VideoDispatchHook';
//destructuring props
const Videos = ({ id, title, img, verified, children, editVideo }) => {
  console.log('render videos component having id', id);

  // testing purpose : render first time -> Mounting
  // useEffect(() => {
  //   // performing clean Up : Since cleanUp requires id hence passing the operation inside a new id
  //   const idx = setInterval(() => {
  //     console.log('playing video number', id);
  //   }, 3000);

  //   //return
  //   return () => {
  //     clearInterval(idx);
  //   };
  // }, [id]);

  const theme = useContext(ThemeContext);
  const dispatch = useVideoDataDispatch();
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
