import React from 'react'
import { Navigate } from 'react-router-dom'
import './form.css'

export default class CreateToDo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'text': '',
      'proj_id': 1,
      'toRedirect': false
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createToDo(this.state.text, this.state.proj_id)
    console.log("== handleSabmit ==:", this.state.text, this.state.proj_id, this.props.projects)
    this.setState({ toRedirect: true })
  }

  render() {
    if (this.state.toRedirect) return <Navigate to='/todo' />
    return (
      <div className="form">
        <h4>Creating A ToDo</h4>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <select name="proj_id" onChange={(e) => this.handleChange(e)}>
            {this.props.projects.map((project) => <option value={project.id}>{project.title}</option>)}
          </select>
          <input type="text" placeholder="Text" name="text" value={this.state.title} onChange={(e) => this.handleChange(e)} />
          <input type="submit" value="Enter" />
        </form>
      </div>
    )
  }
}
