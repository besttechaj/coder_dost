import './App.css';
import { useReducer, useState } from 'react';
import videoDB from './data/data';
import AddVideo from './components/AddVideo';
import VideoList from './components/VideoList';
// import Counter from './components/Counter';

function App() {
  //replacing the previous code with redux concept

  //updating the state of edit video
  const [editableVideo, setEditableVideo] = useState(null);
  // console.log('current editable video is ', editableVideo);

  // updating the state of original data
  // const [data, setData] = useState(videoDB);

  // data - state
  //action - dispatch(action)
  function dataReducer(data, action) {
    switch (action.type) {
      //to add a video
      case 'ADD':
        return [
          ...data,
          // adding the new video with newly generated id
          { ...action.payload, id: data.length + 1 },
        ];
      //to delete a video
      case 'DELETE':
        return data.filter((Element) => {
          //return only those items whose id doesn't match
          return Element.id !== action.payload;
        });
      //to update a video
      case 'UPDATE':
        //to remove the previous video with the new updated video : slice()
        //to replace the targeted video, we need to find its index from the data
        const targetIndex = data.findIndex(
          (Element) => Element.id === action.payload.id
        );
        console.log('target index', targetIndex);
        //to remove old with new video
        // slice(target Element position, no. of new result to add, result to replace with)
        //here the splice will change the original state and in react we should not change the state directly so we need to make a copy of the state hence we are using [] ... this will make the copy of original data
        const dataList = [...data];
        console.log('datalist before editing ', dataList);
        //performing the operation with the copy of state
        dataList[targetIndex] = action.payload;
        console.log('result ', dataList);
        //to empty the input field
        setEditableVideo(null);
        return dataList;
      //if nothing matches then return the data
      default:
        return data;
    }
  }

  //syntax: const [state,dispatch]=useReducer(reducerLogic[Area where you defined all your function ie logic],initialState)
  //  data - state
  //  dispatch - setState : dispatch indirectly update the state whereas as useState directly updates the states
  const [data, dispatch] = useReducer(dataReducer, videoDB);

  //passing the parameter from the child component known as AddVideos[passing the other child component state as a parameter to this defined function below]
  function addVideos(newVideoUpdate) {
    //action : tells the function name and what parameters that function is expecting ie {type:'ADD',payload:function's parameter}
    // setVideos - means  dispatch(action[method type and its parameters])
    dispatch({ type: 'ADD', payload: newVideoUpdate });
  }

  //logic to delete video
  function deleteVideo(id) {
    dispatch({ type: 'DELETE', payload: id });
    console.log('deleting the video whose id is ', id);
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
    dispatch({ type: 'UPDATE', payload: expectedVideo });
    console.log('value after editing the video ', expectedVideo);

    // setData(dataList);
    //TODO: unsuccessful ?? doubt
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
