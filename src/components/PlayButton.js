import { useContext, useState, memo } from 'react';
import './PlayButton.css';
import { ThemeContext } from '../context/ThemeContext';

// HERE WE ARE WRAPPING THE COMPONENT INSIDE memo because to stop un-wanted re-rendering of component because during re-rendering of the components the render will not renders component hence saving loading time, memory, execution delay and overloading on processor for big calculation. If there is any change in props of this component in future it will re-render memo and stores the resultant component AGAIN.
//NOTE: IF you are memorizing any component then it is compulsory to memorize its props,value and function

// since function PlayButton becomes localVariable while wrapping in memo hook hence store it inside another variable with the same name to export it else this will give PlayButton is not defined error

const PlayButton = memo(function PlayButton({
  //passing children as a prop so to get the nested component
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
    //logic to display play and pause button in console to test the button
    // if (playing)
    //   //calling the passed custom function through prop
    //   onClickingButton_pause();
    // else onClickingButton_play();
    // //converting the value to false
    setPlaying(!playing);
  }

  const theme = useContext(ThemeContext);
  return (
    <button
      className={theme}
      onClick={handleClick}
      style={{
        borderBlockColor: 'red',
        borderBlockEndColor: 'blue',
        marginTop: '2px',
        marginBottom: '2px',
      }}
    >
      {children} : {playing ? ' ⏸️ ' : ' ▶️ '}
    </button>
  );
});

export default PlayButton;
