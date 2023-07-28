import React, { useCallback, useMemo, useRef, useState } from 'react';

const Counter = () => {
  console.log(
    'rendering counter component and its variables with their initial values'
  );
  const [number, setNumber] = useState(40);
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

  //TIP: useMemo hook is used to memorize the function's calculation result whereas useCallback hook is used to memorize the function to perform that operation. Due to use memo and use callback hook during re-rendering of the component the render will not render the function and its value hence saving loading time, memory, execution delay and overloading on processor for big calculation. If there is any change in input function or input passed value then we have added dependency array inside hook which will re-render callback and useMemo and stores the result AGAIN.
  // you can also use useMemo to store the function but it make more nested function hence we are using callback hook

  // useCallback hook : stores the function inside it hence   hence next time while re-rendering the component the fibonacci functionwill not perform calculation and it will also not load the processor or any kind of delay.
  const functionMemorised = useCallback(
    //EXPLANATION FOR : useMemo hook
    // fibonacci series is a good example to understand useMemo hook since involves more time to calculate the result which overloads your processor performance. because bigger the number bigger will be the calculation and processor overloading.
    // function to calculate fibonacci series ...useMemo hook -> useMemo hook is used to store the function calculation/result or any big problem result  hence next time during re-rendering the component will not calculate the result again since the result is already stored inside useMemo , this will save the time for calculation also not load the processor for running and calculating the same function result ... so next time during component re-rendering the code will not re-render(ie perform calculation which takes time and memory and delay the execution time) the function fibonacci (because without useMemo hook if you are performing some big calculation for your result , if you re-render the component for any other use then due to that re-rendering also happens in this due to which it will again calculate the result and takes time and memory, delay the execution then displaying the result  ) again  because it has already stored the result in useMemo HOOK of fibonacci function result.

    function fibonacci(n) {
      //here n-> given input
      if (n === 1 || n === 2) {
        return 1;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    },
    //dependency: storing the function inside another memorize value using callBack hook ... dependency tells us if there is any change in function or any parameters it will re-render the callBack function.since the function is defined inside hence this will not re-render this function during next re-rendering
    []
  );

  //defining useMemo(function,[dependency array])
  const fibMemorisedValue = useMemo(
    () => functionMemorised(number),
    //dependency: since while memorizing the function's result value we also need to memorize the function as well hence we are  storing the function inside another memorize value using callBack hook ... dependency tells us if there is any change in function or any parameters it will re-render the useMemo function.
    [number, functionMemorised]
  );
  console.log(
    `Fibonacci input is ${number} and result is ${fibMemorisedValue}`
  );
  return (
    <>
      <h2 style={{ color: 'green', backgroundColor: 'black' }}>
        since we have store the fibonacci calculation result inside useMemo hook
        hence next time while re-rendering the component the fibonacci function
        will not perform calculation and it will also not load the processor or
        any kind of delay.
        {number} || fibonacci of given number is {fibMemorisedValue}
      </h2>
      <button onClick={handleClick}>Add</button>
    </>
  );
};

export default Counter;
