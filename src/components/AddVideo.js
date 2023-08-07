import {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import './AddVideo.css';
import { ThemeContext } from '../context/ThemeContext';
import useVideoDataDispatch from '../customHooks/VideoDispatchHook';
// forwardRef api --> it is used used to wrap the targeted child component and also use to receive the ref from the parent component

// forwardRef api --> if use without declaring useIMperativeRef hook that means you are completely exposing your child dom node ref (eg. input) to the parent component.

//Apart from useRef,another type of ref is called useImperativeHandle: it is rarely used when you want to use the ref from child component node (eg input tag) inside its parent component similar to state lifting. but if you use useImperativeHandle then you are not exposing the child dom node instead you are limiting the use of ref by giving the limited method to the parent

//NOTE-1:  useImperativeHandle hook is always used with forwardRef API

// Since all node inside a dom is private hence By useImperativeRef Hook you will not need to send/expose your child's dom node.

//use of useImperativeHook :  suppose you don’t want to expose the entire <input> DOM node which is present inside child component, but you want to expose two of its methods: focus and scrollIntoView. To do this, keep the real browser DOM in a separate ref. Then use useImperativeHandle to expose a handle with only the methods that you want the parent component to call. here you are limiting the use of child ref without exposing the child dom node.

//here forward ref API is used to wrap the child component and forwardRef lets your component expose a DOM node to parent component with a ref.

//Call forwardRef() to let your component receive a ref and forward it to a child component:
const AddVideo = forwardRef(function AddVideo(
  { editableVideo },
  //passing ref as a prop from parent to child
  ref
) {
  let initialState = {
    id: '',
    title: '',
    img: '',
    verified: false,
  };
  const [newVideo, setNewVideo] = useState(initialState);

  //handle submit function
  function handleChange(e) {
    // console.log(e.target.name, e.target.value);
    setNewVideo({
      ...newVideo,
      // e.target.name is string hence first we need to evaluate it and then add as a key that's why we use [e.target.name]
      [e.target.name]: e.target.value,
    });
  }

  //handle submit function
  function handleSubmit(e) {
    //page reloading is a default behavior of form hence we need to use preventDefault method with syntheticBaseEvent ie e.preventDefault()
    e.preventDefault();
    if (editableVideo) {
      dispatch({ type: 'UPDATE', payload: newVideo });
      console.log('value after editing the video ', newVideo);
    } else {
      //passing the state to parent component as a parameters inside addVideo function which we have already fetched through props
      //action : tells the function name and what parameters that function is expecting ie {type:'ADD',payload:function's parameter}
      // setVideos - means  dispatch(action[method type and its parameters])
      dispatch({ type: 'ADD', payload: newVideo });
    }

    //after sending data restore the input to its empty value
    setNewVideo(initialState);
  }

  useEffect(() => {
    console.log(
      'running the useEffect whenever component mount for first time'
    );
    if (editableVideo) {
      console.log(
        'running the useEffect whenever there is a change in specified dependencies'
      );
      console.log('change in dependency occurred ', editableVideo);
      // console.log('change in dependency occurred ', editableVideo[0].title);
      setNewVideo({
        id: editableVideo[0].id,
        title: editableVideo[0].title,
        img: editableVideo[0].img,
        verified: editableVideo[0].verified,
      });
    }
    //focusing the input by giving reference to an input
    // inputRef is the name , whereas current contains the element present inside that name and focus is a useRef method
    // inputRef.current.focus();
  }, [editableVideo]);

  const theme = useContext(ThemeContext);

  //calling dispatch
  const dispatch = useVideoDataDispatch();

  // we need to define extra ref to useImperativeHandle hook
  const iRef = useRef(null);
  //declaring useImperativeHandle hook to limit the use of ref from parent component without exposing the child dom node (ie input tag) instead providing the accessible methods. because if we don't use useImperativeHandle then parent will have access to all the methods which belongs with that ref due to this sometime programming mistake occurs hence by pre-defining method and limited you are not exposing the element and giving access to limited methods of the ref to the parent.
  useImperativeHandle(
    // below ref is the ref from the parent component which fetched through the forwardRef api
    ref,
    () => {
      return {
        //creating one custom function
        jumpTo() {
          iRef.current.focus();
        },
      };
    },
    []
  );
  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={iRef}
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
        //to make this controlled form add value
        value={newVideo.title}
      />
      <input
        type='text'
        placeholder='image link'
        onChange={handleChange}
        name='img'
        //to make this controlled form add value
        value={newVideo.img}
      />
      <input
        type='text'
        placeholder='verified status'
        onChange={handleChange}
        name='verified'
        //to make this controlled form add value
        value={newVideo.verified}
      />
      <button
        className={theme}
        style={{
          borderBlockColor: 'red',
          borderBlockEndColor: 'blue',
          marginTop: '2px',
          marginBottom: '2px',
        }}
      >
        {editableVideo ? 'Edit Video' : 'Add Video'}
      </button>
    </form>
  );
});

export default AddVideo;
