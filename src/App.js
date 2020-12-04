import React, {useEffect, useState} from 'react'

import logo from './logo.svg';
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

  useEffect(()=>{
    callApi()
  }, [])


  return (
    <div className="App">
      <header className="App-header">
       {connection && <div>
         Connected to the API!
       </div>

       }
      </header>
    </div>
  );
}

export default App;
