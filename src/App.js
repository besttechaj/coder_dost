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
  // console.log('current editable video is ', editableVideo);

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
    // console.log(editableVideo);
    //other way:   METHOD -2
    //setEditableVideo(data.find(Element)=>Element.id===id)
  }

  //logic to update video after editing the video and fetched that video here
  const updateVideo = (expectedVideo) => {
    console.log('value after editing the video ', expectedVideo);
    //to remove the previous video with the new updated video : slice()
    //to replace the targeted video, we need to find its index from the data
    const targetIndex = data.findIndex(
      (Element) => Element.id === expectedVideo.id
    );
    console.log('target index', targetIndex);
    //to remove old with new video
    // slice(target Element position, no. of new result to add, result to replace with)
    //here the splice will change the original state and in react we should not change the state directly so we need to make a copy of the state hence we are using [] ... this will make the copy of original data
    const dataList = [...data];
    console.log('datalist before editing ', dataList);
    //performing the operation with the copy of state
    dataList[targetIndex] = expectedVideo;
    console.log('result ', dataList);
    setData(dataList);
    // console.log(
    //   'after operation ',
    //   dataList.slice(targetIndex, 1, {
    //     title: expectedVideo.title,
    //     img: expectedVideo.img,
    //     verified: expectedVideo.verified,
    //   })
    // );
  };

  console.log('render App component');
  return (
    //adding onClick event in parent component
    <div
      className='App'
      // onClick={() => console.log('Running App component due to event bubbling')}
    >
      <AddVideo
        addVideos={addVideos}
        editableVideo={editableVideo}
        updateVideo={updateVideo}
      ></AddVideo>
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
