import React, {useEffect, useState} from 'react'
import {Button} from '@material-ui/core'
import './App.css';
import {API} from 'aws-amplify'

const App = () => {
  const [connection, toggleConnection] = useState(null) 

  async function callApi(username, password) {
    try { 
      const loginData = await API.get('loginapi', `/login`)
      toggleConnection(loginData)
    } catch(err) {
      console.log(err)
    }
  }

  async function checkLogin() {
    try {
      const loginTest = await API.get('loginapi', `/login/test/test`)
      console.log(loginTest)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    callApi()
  }, []) 



  const handleClick = () => {
    console.log("you clicked me")
    checkLogin()
  }

  return (
    <div className="App">
      <header className="App-header">
       {connection && <div>
         Connected to the API!
         <Button onClick={handleClick}>Test Login</Button>
       </div>
       }
      </header>
    </div>
  );
}

export default App;
