import React from 'react'
import { Navigate } from 'react-router-dom'

export default class LogOut extends React.Component {

  componentDidMount() {
    this.props.logout();
  }

  render() { return <Navigate to='/users/' /> }
}