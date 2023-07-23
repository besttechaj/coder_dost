import { useContext } from 'react';
import VideoDispatchContext from '../context/VideoDispatchContext';

//creating custom hook for using useContext which can be implemented further in many files where useContext is needed and hence we are doing code refactor so there will be no need to import useContext and other files also to use useContext

//NOTE: Create a custom hook with "use" keyword
function useVideoDataDispatch() {
  const dispatch = useContext(VideoDispatchContext);
  return dispatch;
}

export default useVideoDataDispatch;
