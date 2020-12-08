import React,{createContext, useState, useEffect} from 'react'

export const UserContext = createContext(null);

const UserContextProvider = (props) => {
    const [loggedIn, toggleLoggedIn] = useState(localStorage.getItem('isLoggedIn') === "true" ? true : false)

    useEffect(()=> {
        localStorage.setItem('isLoggedIn', loggedIn)
    }, [loggedIn])
    
    const toggleLogin = () => {
        toggleLoggedIn(!loggedIn)
    }

    return (
        <UserContext.Provider value={{loggedIn, toggleLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider

