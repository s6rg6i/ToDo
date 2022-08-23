import React, { Component } from 'react';
import axios from 'axios';
import ToDosRepr from './ToDosRepr.js'

const dbg_todos = [
  { "id": 1, "project": "Project 1", "author": "ivan", "text": "1-я заметка", "created_at": "2022-08-01T06:00:00Z", "modified_at": "2022-08-01T06:00:00Z", "is_active": true },
  { "id": 2, "project": "Project 2", "author": "alla", "text": "2-я заметка", "created_at": "2022-08-02T12:46:58Z", "modified_at": "2022-08-02T09:28:28Z", "is_active": true },
  { "id": 3, "project": "Project 3", "author": "ivan", "text": "3-я заметка", "created_at": "2022-08-03T09:28:52Z", "modified_at": "2022-08-03T09:28:52Z", "is_active": false },
  { "id": 4, "project": "Project 3", "author": "alla", "text": "4-я заметка", "created_at": "2022-08-04T12:48:53Z", "modified_at": "2022-08-04T12:49:00Z", "is_active": true },
]

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.debug ? ({ 'todos': dbg_todos }) : { 'todos': [], }
  }

  componentDidMount() {
    if (!this.props.debug) {
      axios.get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
          const todos = response.data
          this.setState({
            'todos': todos
          })
        }
        ).catch(error => console.log(error))
    }
  }

  render() {
    return (
      <div>
        <h3>Список ToDo</h3>
        <ToDosRepr todos={this.state.todos} />
      </div>
    );
  }
}