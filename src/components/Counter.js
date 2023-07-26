import React, { useRef, useState } from 'react';

const Counter = () => {
  console.log(
    'rendering counter component and its variables with their initial values'
  );
  const [number, setNumber] = useState(0);
  //initial value of num
  // let num = 0;
  //using ref to solve num problem reason is mentioned below in the code
  let num = useRef(0);

  function handleClick(e) {
    //to stop event bubbling
    e.stopPropagation();

    //setNumber without updater function
    setNumber(number + 1); //1
    setNumber(number + 1); //1
    setNumber(number + 1); //1

    //setNumber with updater function takes the previous value and gives a new updated value ---> 3hr 13min
    // setNumber((number) => number + 1); //1
    // setNumber((number) => number + 1); //2
    // setNumber((number) => number + 1); //3
    // console.log('handling click');
    //console is printing the previous value because component re-render after completion of function task since we are calling number before component get render

    // setNumber((number) => number + 1);
    // setNumber((number) => number + 1);
    // setNumber((number) => number + 1);
    // setNumber((number) => number + 1);
    //here the number variable is displaying the previous value because this function is re-render(re-run) after complete execution of this function since this number variable is called before the complete execution/re-render of this function.
    console.log(
      'printing the number state before function gets re-render during component re-rendering',
      number
    );
    // due to component re-rendering this updating the initial value again and displaying it ... so the solution is you can go with useRef hook instead of useState hook again because useState (state is used TO DISPLAY REACT'S UI ) this num is not a state(you can use it to store some value) , it is just a variable so that's why if we use num with useState the code will become more complex and also we need to again use setState properties to set the num value hence to overcome all these problems you can use useRef hook for variables in react to update its value later depending on operation or to give any element any reference.
    // num++;
    //so we have a property in useRef known as current
    //POINT TO REMEMBER: NEVER USE useRef to create a state to display it in react Ui... Use it only for to store values and to give reference to any element
    num.current++;
    console.log('no. of times this counter handle function clicked is ', num);
  }

  return (
    <>
      <h2 style={{ color: 'green', backgroundColor: 'black' }}>{number}</h2>
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default Counter;
