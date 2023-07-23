import { useContext } from 'react';
import VideosDataContext from '../context/VideosDataContext';
function useDataHook() {
  const data = useContext(VideosDataContext);
  return data;
}

export default useDataHook;
