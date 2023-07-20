import { useState, useEffect } from 'react';
import './AddVideo.css';
function AddVideo({ dispatch, editableVideo }) {
  let initialState = {
    id: '',
    title: '',
    img: '',
    verified: false,
  };
  const [newVideo, setNewVideo] = useState(initialState);

  function handleChange(e) {
    // console.log(e.target.name, e.target.value);
    setNewVideo({
      ...newVideo,
      // e.target.name is string hence first we need to evaluate it and then add as a key that's why we use [e.target.name]
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    //page reloading is a default behavior of form hence we need to use preventDefault method with syntheticBaseEvent ie e.preventDefault()
    e.preventDefault();
    if (editableVideo) {
      dispatch({ type: 'UPDATE', payload: newVideo });
      console.log('value after editing the video ', newVideo);
    } else {
      //passing the state to parent component as a parameters inside addVideo function which we have already fetched through props
      //action : tells the function name and what parameters that function is expecting ie {type:'ADD',payload:function's parameter}
      // setVideos - means  dispatch(action[method type and its parameters])
      dispatch({ type: 'ADD', payload: newVideo });
    }

    //after sending data restore the input to its empty value
    setNewVideo(initialState);
  }

  useEffect(() => {
    console.log(
      'running the useEffect whenever component mount for first time'
    );
    if (editableVideo) {
      console.log(
        'running the useEffect whenever there is a change in specified dependencies'
      );
      console.log('change in dependency occurred ', editableVideo);
      // console.log('change in dependency occurred ', editableVideo[0].title);
      setNewVideo({
        id: editableVideo[0].id,
        title: editableVideo[0].title,
        img: editableVideo[0].img,
        verified: editableVideo[0].verified,
      });
    }
  }, [editableVideo]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
        //to make this controlled form add value
        value={newVideo.title}
      />
      <input
        type='text'
        placeholder='image link'
        onChange={handleChange}
        name='img'
        //to make this controlled form add value
        value={newVideo.img}
      />
      <input
        type='text'
        placeholder='verified status'
        onChange={handleChange}
        name='verified'
        //to make this controlled form add value
        value={newVideo.verified}
      />
      <button>{editableVideo ? 'Edit Video' : 'Add Video'}</button>
    </form>
  );
}

export default AddVideo;
