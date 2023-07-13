import './App.css';
import { useState } from 'react';
import Videos from './components/Videos';
import videoDB from './data/data';
import PlayButton from './components/PlayButton';
import Counter from './components/Counter';

function App() {
  const [data, setData] = useState(videoDB);

  function handleAddVideo() {
    console.log('Adding a new video');
    //appending a new video
    setData([
      ...data,
      {
        id: data.length + 1,
        title: 'Nodejs',
        img: 'https://tse1.mm.bing.net/th?id=OIP.UxeMQDgyOwdzpmyAY2GYAgHaHb&pid=Api&rs=1&c=1&qlt=95&w=103&h=103',
        verified: true,
      },
    ]);
  }

  console.log('render App component');
  return (
    //adding onClick event in parent component
    <div
      className='App'
      onClick={() => console.log('Running App component due to event bubbling')}
    >
      <button onClick={handleAddVideo}>Add Video</button>
      <div
        className='App-header'
        style={{ display: 'flex', flexDirection: 'row' }}
      >
        {data.map((Iterator) => (
          //passing props to each iterator element
          <Videos {...Iterator} key={Iterator.id}>
            {/* declaring nested component and passing it through prop called
            children(used to get the nested component as a prop) inside Video
            component */}
            <PlayButton
              onClickingButton_play={() => console.log('Play', Iterator.title)}
              onClickingButton_pause={() => {
                console.log('pause', Iterator.title);
              }}
            >
              {Iterator.title}
            </PlayButton>
          </Videos>
        ))}
      </div>
      <div>
        {/* passing custom attributes value and custom function */}
        {/* <PlayButton
          message='play-msg'
          onClickingButton_play={() => console.log('Play')}
          onClickingButton_pause={() => {
            console.log('pause');
          }}
        >
          Play
        </PlayButton> */}
        {/* <PlayButton
          message='pause-msg'
          onClickingButton={() => alert('Paused')}
        >
          Pause
        </PlayButton> */}
      </div>
      <Counter></Counter>
    </div>
  );
}

export default App;
