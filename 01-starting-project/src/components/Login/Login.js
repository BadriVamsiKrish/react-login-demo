import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {

  const [enteredClgName, setEnteredClgName] = useState('');
  const [clgNameIsValid, setClgNameIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  // useEffect(()=>{
  //   const identifier = setTimeout(() => {
  //     console.log("check validity");
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredClgName.trim().length > 0
  //     );
  //   },500);
  //  return () =>{
  //   console.log("clean up");
  //   clearTimeout(identifier);
  //  }
  // },[enteredEmail,enteredPassword,enteredClgName]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid
    )
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      (emailState.isValid && event.target.value.trim().length > 6)
    );
  };
  const clgNameChangeHandler = (event) => {
    setEnteredClgName(event.target.value);
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };
  const validateClgNameHandler = () => {
    setClgNameIsValid(enteredClgName.trim().length > 0);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, enteredClgName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${clgNameIsValid === false ? classes.invalid : ''
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