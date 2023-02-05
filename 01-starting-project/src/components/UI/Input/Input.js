import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  }

  useImperativeHandle(ref, () => {
    return {
      focus: activate
    }
  })
  return (
    <div
      className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
        }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  )
})

export default Input;

/*
How many times does useEffect(()=> {} , []) get called in the input component.
--> useEffect does not get called in input component

What does useImperativeHandler do ? Why do we even need it?
--> imperative function make the use of a function in the other component.

What does React forwardRef do?Why do we even need it?
--> It helps in forwarding the ref to the other component

What the hell are lifecycle ?
--> Lifecycle is nothing but, mounting, updating and unmounting.
mounting --> inserts elements into the DOM
updating --> updating elements in the DOM
unmouting --> Removes elements from the DOM

How do we control each lifecycle in React ?
--> Each component in React has a lifecycle which you can monitor and manipulate during its three main phases.
The three phases are: Mounting, Updating, and Unmounting.

 What the hell are cleanup functions in react?
 --> In React, "cleanup functions" refer to functions that perform some cleanup operations when a component is unmounted (removed from the UI).
The cleanup operations could be anything that needs to be undone, such as canceling network requests,clearing intervals or timeouts, or removing event listeners.
The cleanup functions are typically added inside the useEffect hook. 
The useEffect hook allows you to run some code whenever a component is mounted or updated, 
and it also provides a way to run cleanup operations when the component is unmounted.
*/