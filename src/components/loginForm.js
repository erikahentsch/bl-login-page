import React, {useEffect, useContext, useState} from 'react'
import {makeStyles, Button, Paper, FormControl, InputAdornment, IconButton, InputLabel, FormHelperText, OutlinedInput} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {UserContext} from '../UserContext'

import {API} from 'aws-amplify'

const styles = makeStyles({
    paper: {
      minWidth: '50%',
      maxWidth: 500,
      padding: '2vmax',
      marginTop: '50px',
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
    }
  })

const LoginForm = (props) => {
  const {loggedIn, toggleLogin} = useContext(UserContext)



  const [values, setValues] = useState({
    username: '',
    password: '',
    usernameerror: '',
    passworderror: '',
    showPassword: false,
  });

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
        toggleLogin(true)
        // props.setLogin()
        console.log(props.history.push('/'))
      }
    } catch (err) { 
      console.log('error?', err)
      // toggleError(true)
    }
  } 

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
  




  const classes = styles();
    return (
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
              <Button 
                color="primary" 
                variant="contained" 
                type="submit" 
                onClick={handleSubmit}
              >Log In</Button>
              </form>
       </Paper>
    )
}

export default LoginForm