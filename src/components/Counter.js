import React, { useState } from 'react';

const Counter = () => {
  // console.log('rendering counter component');
  const [number, setNumber] = useState(2);

  function handleClick(e) {
    //to stop event bubbling
    e.stopPropagation();
    setNumber(number + 1);
    // console.log('handling click');
    //console is printing the previous value because component re-render after completion of function task since we are calling number before component get render
    // console.log(number);
  }

  return (
    <>
      <h2 style={{ color: 'green', backgroundColor: 'black' }}>{number}</h2>
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default Counter;
