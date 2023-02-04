import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if(localStorage.getItem('loggedIn') === '1'){
      setIsLoggedIn(true);
    }
  }, []);

  

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('loggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;

/*
What are side effects in React according to you
--> side effects are the React hooks / feature that can be used to stop re-executing the code again when the state changes.

What is the problem that side effect can cause.
--> we cant execute the code again when the user wants if denpendencies are not changed.

How does useEffect hook works and solve the problem
--> useEffect hook generally consists of two arguments one is function and the other is array of dependencies,
when the dependencies chances function gets re-executed. 

What was the problem with the login which we are trying to solve
--> It we logged-In into the page, it shows the" welcome page" but, when we refresh it automatically re-directed to the login page 

What was the mechanism used to solve the problem. Explain the steps
-->Here, to solve this problem, we use Effect hook.

What does this [] mean in useEffect ( () => cbfunction, []). What does the second argument used for.
--> [] means an array, it contains the dependencies when their state changes function will get executed again

What is the dependency important in the useEffect . If we dont use dependency , do you know what would happen
--> Yes, dependencies are important to re-execute the useEffect function when the state changes. 
If there are no dependencies re-execution of code does not occur.

Why do we have enteredEmail and enteredPassword in the dependency of useEffect
--> since, when their state changes when the user enters in input field it state is getting changed and the function is getting called to check validity.
*/