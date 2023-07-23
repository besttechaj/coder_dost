import { createContext } from 'react';
//initializing the value of createContext with by default value that is null but we are passing the original value inside provider
const VideosDataContext = createContext(null);

export default VideosDataContext;
