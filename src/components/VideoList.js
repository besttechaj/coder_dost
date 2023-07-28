import Videos from '../components/Videos';
import PlayButton from '../components/PlayButton';
import useDataHook from '../customHooks/VideoDataHook';
import axios from 'axios';
import { useEffect } from 'react';
import useVideoDataDispatch from '../customHooks/VideoDispatchHook';
const VideoList = ({ editVideo }) => {
  //To generate fake json data/api use mockaroo.com
  //api data fetch using axios from backend..
  const url = 'https://api.mockaroo.com/api/aa3cef10?count=7&key=c155e640';

  const dispatch = useVideoDataDispatch();

  //calling this function through useEffect instead of onClick button
  // const getVideosFromApi = async () => {
  //   console.log('running load more videos..');
  //   const response = await axios.get(url);
  //   // console.log(response.data);
  //   dispatch({ type: 'LOAD', payload: response.data });
  // };

  useEffect(() => {
    const getVideosFromApi = async () => {
      console.log('running load more videos..');
      const response = await axios.get(url);
      // console.log(response.data);
      dispatch({ type: 'LOAD', payload: response.data });
    };
    getVideosFromApi();
  }, []);

  const data = useDataHook();

  return (
    <>
      <div
        className='App-header'
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {data.map((Iterator) => (
          //passing props to each iterator element
          <Videos
            {...Iterator}
            key={Iterator.id}
            id={Iterator.id}
            editVideo={editVideo}
          >
            {/* declaring nested component and passing it through prop called
            children(used to get the nested component as a prop) inside Video
            component */}
            <PlayButton
            //passing custom attributes value and custom function
            // onClickingButton_play={() => console.log('Play', Iterator.title)}
            // onClickingButton_pause={() => {
            //   console.log('pause', Iterator.title);
            // }}
            >
              {Iterator.title}
            </PlayButton>
          </Videos>
        ))}
      </div>
      {/* <button onClick={getVideosFromApi}>Load more videos</button> */}
    </>
  );
};

export default VideoList;
