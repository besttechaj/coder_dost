import './App.css';
import { useState } from 'react';
import videoDB from './data/data';
import AddVideo from './components/AddVideo';
import VideoList from './components/VideoList';
// import Counter from './components/Counter';

function App() {
  // updating the state of original data
  const [data, setData] = useState(videoDB);

  //updating the state of edit video
  const [editableVideo, setEditableVideo] = useState(null);

  //passing the parameter from the child component known as AddVideos[passing the other child component state as a parameter to this defined function below]
  function addVideos(newVideoUpdate) {
    setData([
      ...data,
      // adding the new video with newly generated id
      { ...newVideoUpdate, id: data.length + 1 },
    ]);
  }

  //logic to delete video
  function deleteVideo(id) {
    console.log('deleting the video whose id is ', id);
    //we need to again update the original data
    setData(
      data.filter((Element) => {
        //return only those items whose id doesn't match
        return Element.id !== id;
      })
    );
  }

  //logic to edit video
  function editVideo(id) {
    console.log('editing the video whose id is ', id);
    // fetching the selected video from the list using video's id ..
    // here we are creating a new object using useState hook since our initial value of editableVideo is null
    setEditableVideo(data.filter((Element) => Element.id === id));
    //it will display the previous state because this function gets re-rendered after complete execution and here we printing the result before function get re-rendered
    console.log(editableVideo);
  }

  console.log('render App component');
  return (
    //adding onClick event in parent component
    <div
      className='App'
      onClick={() => console.log('Running App component due to event bubbling')}
    >
      <AddVideo addVideos={addVideos} editableVideo={editableVideo}></AddVideo>
      {/* passing the state */}
      <VideoList
        allData={data}
        deleteVideo={deleteVideo}
        editVideo={editVideo}
      />
      {/* logic to understand counter  */}
      {/* <Counter></Counter> */}
    </div>
  );
}

export default App;
