import React from 'react'
import { Navigate } from 'react-router-dom'
import './form.css'

export default class CreateProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'title': '',
      'repository': '',
      'users': '',
      'toRedirect': false
    }
  }

  hChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleUsersSelect(event) {
    let users = []
    if (event.target.selectedOptions)
      for (let option of event.target.selectedOptions) users.push(option.value)
    this.setState({ 'users': users })
  }


  handleSubmit(event) {
    event.preventDefault()
    this.props.createProject(this.state.title, this.state.repository, this.state.users)
    console.log("handleSabmit", this.state.title, this.state.repository, this, this.state.users)
    this.setState({ toRedirect: true })
  }

  render() {
    if (this.state.toRedirect) return <Navigate to='/projects/' />
    return (
      <div className="form">
        <h4>Creating A Project</h4>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={(e) => this.hChange(e)} />
          <input type="url" placeholder="Repository URL" name="repository" value={this.state.repository} onChange={(e) => this.hChange(e)} />
          <select multiple onChange={(e) => this.handleUsersSelect(e)}>
            {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
          </select>
          <input type="submit" value="Enter" />
        </form>
      </div>
    )
  }
}
