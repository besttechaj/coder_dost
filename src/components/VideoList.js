import Videos from '../components/Videos';
import PlayButton from '../components/PlayButton';
import useDataHook from '../customHooks/VideoDataHook';
import axios from 'axios';
import { useCallback, useEffect, useMemo } from 'react';
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
      console.log('fetching and running videos from Api..');
      const response = await axios.get(url);
      // console.log(response.data);
      //TODO :  un-comment below line to send data to UI
      // dispatch({ type: 'LOAD', payload: response.data });
    };
    getVideosFromApi();
  }, []);

  const data = useDataHook();

  //NOTE: IF you are memorizing any component using memo hook then it is compulsory to memorize its props,value and function
  const play = useCallback(() => console.log('Play...'), []);
  const pause = useCallback(() => {
    console.log('pause...');
  }, []);

  //creating a useMemo for play button
  const memoButton = useMemo(
    () => (
      <>
        {/* declaring nested component and passing it through prop called children(used to get the nested component as a prop) inside Videocomponent */}
        , (
        <PlayButton
          //passing custom attributes value and custom function
          onClickingButton_play={play}
          onClickingButton_pause={pause}
        >
          {/* {Iterator.title} */}Play
        </PlayButton>
        )
      </>
    ),
    [pause, play]
  );
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
            {memoButton}
          </Videos>
        ))}
      </div>
      {/* <button onClick={getVideosFromApi}>Load more videos</button> */}
    </>
  );
};

export default VideoList;
