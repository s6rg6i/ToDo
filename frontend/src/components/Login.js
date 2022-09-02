import React from 'react'
import { Navigate } from 'react-router-dom'
import './Login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'login': '',
      'password': '',
      'toRedirect': false
    }
  }

  hChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.obtainAuthToken(this.state.login, this.state.password);
    this.setState({ toRedirect: true })
  }

  render() {
    if (this.state.toRedirect) return <Navigate to='/users/' />
    return (
      <div className="login">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" placeholder="Login" name="login" value={this.state.login} onChange={(e) => this.hChange(e)} />
          <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={(e) => this.hChange(e)} />
          <input type="submit" value="Enter" />
        </form>
      </div>
    )
  }
}
