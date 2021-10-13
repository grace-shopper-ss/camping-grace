import React from 'react'
import {connect} from 'react-redux';
import Button from '@mui/material/Button';

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <h2>This is a test</h2>
      <Button variant="contained">Hello World</Button>
      <h2>This is the end of the test</h2>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
