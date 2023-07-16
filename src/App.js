import './App.css';
import { useState } from 'react';
import videoDB from './data/data';
import AddVideo from './components/AddVideo';
import VideoList from './components/VideoList';
// import Counter from './components/Counter';

function App() {
  const [data, setData] = useState(videoDB);

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

  console.log('render App component');
  return (
    //adding onClick event in parent component
    <div
      className='App'
      onClick={() => console.log('Running App component due to event bubbling')}
    >
      <AddVideo addVideos={addVideos}></AddVideo>
      {/* passing the state */}
      <VideoList allData={data} deleteVideo={deleteVideo} />
      {/* logic to understand counter  */}
      {/* <Counter></Counter> */}
    </div>
  );
}

export default App;
