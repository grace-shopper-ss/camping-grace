import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { Box, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { getHeroText } from "../store";
import Hero from './Hero';





/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const { loadHeroText } = props;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect( () => {
    loadHeroText(displayName)
  },[]);

  return (
    <div>
      <Hero />
      <Paper>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container direction='column' alignItems='center' justifyContent='center' sx={{m:'2', p:'2em 3em 2em 0'}}spacing={0}>
            <Grid item xs={10} md={4}>
              <TextField
                id="username-input"
                label="Username"
                value={username}
                onChange={handleChangeUsername}
                fullWidth       
                />
                <TextField
                id="password-input"
                label="Password"
                value={password}
                onChange={handleChangePassword}
                type="password"
                fullWidth
                />
                <Button 
                variant="auth-button"
                id="submitAuth"
                endIcon={<div id='iconGroup'><KeyboardArrowRightIcon id="authIcon"/> <KeyboardArrowRightIcon id="authIcon2"/></div>}
                
                fullWidth
              >
                {displayName}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    },
    loadHeroText(heroHeading){
      dispatch(getHeroText(heroHeading))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
