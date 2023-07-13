import { useState } from 'react';
import './PlayButton.css';

//passing children as a prop so to get the nested component
export default function PlayButton({
  children,
  onClickingButton_play,
  onClickingButton_pause,
}) {
  console.log('render Playbutton component');
  const [playing, setPlaying] = useState(false);
  //event handler
  // e : event object also known as SyntheticBaseEvent
  // e : we can target its value to perform some operation
  // e : gives information based on current triggered event like its location and many information to track user . and we can perform some action by using this eg e.preventDefault()
  function handleClick(e) {
    // console.log(e);
    //To stop the event bubble : ie whenever a event is triggered, due to nested scope it starts propagating from child to parent.to stop event bubbling we need to define some method known as :
    e.stopPropagation();
    //to stop the default behavior of the page which is occurred due to current event triggered
    e.preventDefault();
    if (playing)
      //calling the passed custom function through prop
      onClickingButton_pause();
    else onClickingButton_play();
    //converting the value to false
    setPlaying(!playing);
  }
  return (
    <button onClick={handleClick}>
      {children} : {playing ? ' ⏸️ ' : ' ▶️ '}
    </button>
  );
}
