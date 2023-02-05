import React, { useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

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

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const authCtx = useContext(AuthContext);

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


  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  };


  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
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


/*
--->contect api
When would you use useState and when would you use useReducer. Its important to know this. Reducers are favourite interview question.
--> when there are complex state update we use 'useReducer', and when there are simple state updates we use 'usestates'.

What is the problem we are trying to solve here?
--> Here, since we can't access directly to the sibling components and accessing to them is a complex procedure since,
 we have to call each component using props through parent component, we are using context api tool to solve this problem.

 What is prop chain and what is the problem that it has?
--> The process of accessing components using props in each component is called as "prop chain". It is a complex task.

What is prop chain and what is the problem that it has?
--> We use context api tool in React, to solve the problem more effectively.

Please write down the steps involved to add the Login context
---> create a folder(store) --> 
add file(auth-context.js)--> create a variable(AuthContext) with React.createContext({loggedIn: false}) which will be the object used in context.
--> Go to App.js wrap the elements inside the AuthContext.Provider element, now pass the value attribute inside it which acts as Provider.
--> Now in navigation component wrap the elements indside AuthContext.Consumer element, which envokes the values from provider file.

How do we consume the context API
--> In consumer component it consumes the content from the provider and returns the values to inside elements.

What do you think about context API. When would you use it
--> context API creates the accessability b/w the components very simple.
*/