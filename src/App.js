import './App.css';
import { useState } from 'react';
import Videos from './components/Videos';
import videoDB from './data/data';
import PlayButton from './components/PlayButton';
import AddVideo from './components/AddVideo';
// import Counter from './components/Counter';

function App() {
  const [data, setData] = useState(videoDB);

  console.log('render App component');
  return (
    //adding onClick event in parent component
    <div
      className='App'
      onClick={() => console.log('Running App component due to event bubbling')}
    >
      <AddVideo></AddVideo>
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
          <Videos {...Iterator} key={Iterator.id}>
            {/* declaring nested component and passing it through prop called
            children(used to get the nested component as a prop) inside Video
            component */}
            <PlayButton
              //passing custom attributes value and custom function
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
      {/* logic to understand counter  */}
      {/* <Counter></Counter> */}
    </div>
  );
}

export default App;
