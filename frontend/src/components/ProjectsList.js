import React, { Component } from 'react';
import axios from 'axios';
import ProjectsRepr from './ProjectsRepr.js'

const dbg_projects = [
  { "id": 1, "title": "Project 1", "repository_url": "http://project.html", "users": ["alla"] },
  { "id": 2, "title": "Project 2", "repository_url": "http://pr2.com", "users": ["ivan"] },
  { "id": 3, "title": "Project 3", "repository_url": "http://pr2.com", "users": ["ivan", "alla"] },
]

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.debug ? ({ 'projects': dbg_projects }) : { 'projects': [], }
  }

  componentDidMount() {
    if (!this.props.debug) {
      axios.get('http://127.0.0.1:8000/api/project/')
        .then(response => {
          const projects = response.data
          this.setState({
            'projects': projects
          })
        }
        ).catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div>
        <h3>Список проектов</h3>
        <ProjectsRepr projects={this.state.projects} />
      </div>
    );
  }
}