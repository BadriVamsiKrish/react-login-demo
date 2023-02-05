import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    loggedIn: false,
    onLogout: () => { },
    onLogin: (email,password) => {}
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('loggedIn') === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('loggedIn');
        setIsLoggedIn(false);
    }
    const loginHandler = () => {
        localStorage.setItem('loggedIn', '1');
        setIsLoggedIn(true);
    }
    return <AuthContext.Provider
       value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
       }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;

/*
What does the AuthContextProvider do eactly.
--> It acts as a component in which App.js component is wrapped from which all the values or states can utilized to all the components.

Tell the steps used by the udemy trainer to migrate to AuthContextProvider pattern
--> created a component and wrapped app component inside it, and imported this context provider in all the components in which has to be used

What are the disadvantage of Context Api and what is the solution
--> It is not optimized for high frquency changes

When should you call hooks and when you should not
--> React hooks are always start with use, 

Tell about the 3 rules and explain each one of them
--> Only call React hooks in React functions.
--> React hooks are called at top-level of React custom components.
--> In useEffect() hook always add everything you refer to inside of useEffect() as a dependency.
*/
