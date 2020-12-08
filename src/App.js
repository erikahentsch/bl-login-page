import React, {useEffect, useState} from 'react'

// import {observer} from 'mobx-react'
import {makeStyles, Button, Paper, FormControl, InputAdornment, IconButton, InputLabel, FormHelperText, OutlinedInput} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import banner from './banner.png'
import branding from './companyLogo.png'
import {Route, Switch} from 'react-router-dom'
// import {UserContextProver} from './UserContext.js';
import UserContextProvider from './UserContext'

import './App.css';
import {API} from 'aws-amplify'

import AuthRoute from './components/authRoute.js'
import TopNav from './components/topNav'
import LoginForm from './components/loginForm'
import Alerts from './pages/AlertsPage'
import Home from './pages/HomePage'

const styles = makeStyles({
  root: {
    padding: 30,
    display: 'flex', 
    justifyContent: 'center'
  },
  banner: {
    textAlign: 'right',
    display: 'flex',
    width: '100%',
    height: 50,
    maxWidth: 1000,
    position: 'absolute',
    top: 0,
    backgroundColor: '#1a1a1a',
    '& img': {
      maxWidth: '100%',
      flex: '1'
    }
  },
  paper: {
    display: 'flex',
    padding: 10,
    // mrgin: '2vmax',
    width: '100%',
    maxWidth: '980px'
  },
  content: {
    flex: 5
  },
  sidePanel: {
    flex: 1
  },
  title: {
    fontSize: '24px',
    paddingBottom: 15,
  },
  branding: {
    position: 'absolute', 
    bottom: 0,
    width: '100%',
    maxWidth: 1000,
    textAlign: 'right',
    '& img': {
      maxWidth: '40%'
    }
  }
})

const App = () => {
  // const [connection, toggleConnection] = useState(null) 
  // const {loggedIn} = useContext(UserContext)
  // const [loggedIn, toggleLoggedIn] = useState(false)
  // const [error, toggleError] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
    usernameerror: '',
    passworderror: '',
    showPassword: false,
  });

  // useEffect(()=> {
  //   localStorage.setItem('loggedIn', loggedIn)
  // }, [loggedIn])

  // const handleLogIn = () => {
  //   toggleLoggedIn(true)
  // }

  const classes = styles()
  const Body = () => {
    return (
      <Switch>
          <Route 
            path='/login' 
            render={props=>(
              <LoginForm 
                {...props}
                values={values} />
            )} />
          <AuthRoute exact path='/' component={Home} />
          <AuthRoute path='/alerts' component={Alerts} />
      </Switch>
    )
  }

  // async function callApi(username, password) {
  //   try { 
  //     const loginData = await API.get('loginapi', `/login`)
  //     toggleConnection(loginData)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(()=>{
  //   callApi()
  // }, []) 

  // const handleLogOut = () => {
  //   setValues({...values, username: ''})
  //   toggleLoggedIn(false)
  // }

  return (
    <div className="App">
      <UserContextProvider>

      <header className="App-header">
        <div className={classes.banner}>
          <TopNav />
          <img  src={banner} />
        </div>
        <Switch>
          {

            <Body />
          
          }
        </Switch>
       {/* {loggedIn ? 
          <Paper elevation={3} className={classes.paper}>
            <div className={classes.content}>
              <IconBox />
            </div>
            <div className={classes.sidePanel}>
              <Button variant="contained" color="secondary" onClick={handleLogOut}>Log Out</Button>
            </div>
          </Paper>
          :
          <LoginForm 
            setLogin={()=>toggleLoggedIn(true)}
            values={values} 
          />

       } */}
       <div className={classes.branding}>
          <img src={branding}/>
       </div>
      </header>
      </UserContextProvider>

    </div>
  );
}

export default App;
