import React, { useState, useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClgName,setEnteredClgName]= useState('');
  const [clgNameIsValid,setClgNameIsValid]= useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    const identifier = setTimeout(() => {
      console.log("check validity");
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredClgName.trim().length > 0
      );
    },500);
   return () =>{
    console.log("clean up");
    clearTimeout(identifier);
   }
  },[enteredEmail,enteredPassword,enteredClgName]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && enteredEmail.includes('@')
    // );
  };
  const clgNameChangeHandler = (event) =>{
    setEnteredClgName(event.target.value);
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };
  const validateClgNameHandler = () =>{
    setClgNameIsValid(enteredClgName.trim().length > 0);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword,enteredClgName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div 
         className={`${classes.control} ${
          clgNameIsValid === false ? classes.invalid : ''
        }`}
        >
          <label htmlFor='v=clg'>College Name</label>
          <input 
          type='text' 
          id='clgName'
          value={enteredClgName}
          onChange={clgNameChangeHandler}
          onBlur={validateClgNameHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;


/*
What is debouncing? What is the problem with the app if we don't use debouncing?
--> debouncing is using setTimeout function and reducing the count of http request's for every key-stroke.

How does the udemy trainer achieve debouncing in his code?
--> He achieved debouncing by using setTimeout function.

When does the cleanup function get called
--> cleanup function will get called only before the useEffect function gets called.

Why do even need to have cleanup functions?
--> we need cleanup function to delete unneccessary data to be cleaned-up.

When does the useEffect hook get called in the lifecycle. Before rendering or after rendering?
--> useEffect function only gets called after rendering of the component.
*/

/*
When would you use useReducer and why ?
--> When updating state depends on the other state we can use reducer hook 

Why do we create the emailReducer outside the functional component and not inside it?
--> Because it is a reducer function which takes only the component gets executed.

What does the emailReducer do. Please explain
--> Generally, emailReducer takes two arguments i.e., (state,action) and returns an object.
state -- original state/previous state
action -- dispatch function / new state which has to be rendered

How does dispatch actions work.
--> when we update the value or validity, we have to dispatch the action.
*/