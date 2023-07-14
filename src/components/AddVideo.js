import { useState } from 'react';
import './AddVideo.css';
function AddVideo() {
  const [newVideo, setNewVideo] = useState({
    title: '',
    img: '',
    verified: false,
  });

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
    console.log(newVideo);
    return newVideo;
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
      />
      {newVideo.title}
      <input
        type='text'
        placeholder='image link'
        onChange={handleChange}
        name='img'
      />
      <input
        type='text'
        placeholder='verified status'
        onChange={handleChange}
        name='verified'
      />
      <button>Add Video</button>
    </form>
  );
}

export default AddVideo;
