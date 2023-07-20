import React from 'react';
import Videos from '../components/Videos';
import PlayButton from '../components/PlayButton';

const VideoList = ({ allData, dispatch, editVideo }) => {
  console.log(allData);
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
        {allData.map((Iterator) => (
          //passing props to each iterator element
          <Videos
            {...Iterator}
            key={Iterator.id}
            id={Iterator.id}
            dispatch={dispatch}
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
    </>
  );
};

export default VideoList;
