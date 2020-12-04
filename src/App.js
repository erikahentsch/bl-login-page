import React, {useEffect, useState} from 'react'
import {makeStyles, Button, Paper, FormControl, InputAdornment, IconButton, InputLabel, FormHelperText, OutlinedInput} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import banner from './banner.png'
import branding from './companyLogo.png'

import './App.css';
import {API} from 'aws-amplify'

const styles = makeStyles({
  root: {
    padding: 30,
    display: 'flex', 
    justifyContent: 'center'
  },
  banner: {
    textAlign: 'center',
    width: '100%',
    maxWidth: 800,
    position: 'absolute',
    top: 0,
    backgroundColor: '#1a1a1a',
    '& img': {
      maxWidth: '100%'
    }
  },
  paper: {
    maxWidth: 500,
    padding: '2vmax',
  },
  title: {
    fontSize: '24px',
    paddingBottom: 15,
  },
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    paddingBottom:10
  },
  branding: {
    position: 'absolute', 
    bottom: 0,
    width: '100%',
    maxWidth: 800,
    textAlign: 'right',
    '& img': {
      maxWidth: '40%'
    }
  }
})

const App = () => {
  const [connection, toggleConnection] = useState(null) 
  const [loggedIn, toggleLoggedIn] = useState(false)
  const [error, toggleError] = useState(false)
  const [values, setValues] = useState({
    username: '',
    password: '',
    usernameerror: '',
    passworderror: '',
    showPassword: false,
  });

  const classes = styles()


  async function callApi(username, password) {
    try { 
      const loginData = await API.get('loginapi', `/login`)
      toggleConnection(loginData)
    } catch(err) {
      console.log(err)
    }
  }

  async function checkLogin(username, password) {
    try {
      const loginData = await API.get('loginapi',`/login/${username || 'asdf'}/${password || 'asdf'}`)
      console.log('data: ', loginData)
      if (!loginData.validUser) {
        setValues({...values, usernameerror: 'Invalid User.', username: '', password: ''})
      } else if (!loginData.validPassword) {
        setValues({...values, passworderror: 'Invalid Password.', password: ''})
      } else {
        setValues({...values, password: ''})
        toggleLoggedIn(true)
      }
    } catch (err) { 
      console.log('error?', err)
      toggleError(true)
    }
  } 

  useEffect(()=>{
    callApi()
  }, []) 

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value, usernameerror: '', passworderror: '' });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    checkLogin(values.username, values.password);
  }

  const handleLogOut = () => {
    setValues({...values, username: ''})
    toggleLoggedIn(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.banner}>
          <img  src={banner} />
        </div>
       {connection && (loggedIn ? 
          <div>
            <Paper elevation={3} className={classes.paper}>
              <div className={classes.title}>
                Successfully Logged In!
              </div>
              <Button variant="contained" color="secondary" onClick={handleLogOut}>Log Out</Button>
            </Paper>
          </div>
          :
            <Paper elevation={3} className={classes.paper}>
            <form>
              <div className={classes.title}>Log-in to continue</div>
              <div className={classes.textFieldContainer}>
              <FormControl error={values.usernameerror !== ''} className={ classes.textField} variant="outlined">
                <InputLabel htmlFor="username-textfield">Username</InputLabel>
                <OutlinedInput
                  id="username-textfield"
                  value={values.username}
                  onChange={handleChange('username')}
                  placeholder="Username"
                  labelWidth={75}
                  
                />
                <FormHelperText>{values.usernameerror}</FormHelperText>
              </FormControl>
              <FormControl error={values.passworderror !== ''} className={classes.textField} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText>{values.passworderror}</FormHelperText>
              </FormControl>
              </div>
              <Button color="primary" variant="contained" type="submit" onClick={handleSubmit}>Log In</Button>
              </form>
       </Paper>)}
       <div className={classes.branding}>
          <img src={branding}/>
       </div>
      </header>
    </div>
  );
}

export default App;
