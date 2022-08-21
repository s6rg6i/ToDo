import React, { Component } from 'react';
import axios from 'axios';
import ToDosRepr from './ToDosRepr.js'
import { useParams } from "react-router-dom";

const filter_todos = [
  { "id": 3, "project": "Project 3", "author": "ivan", "text": "3-я заметка", "created_at": "2022-08-03T09:28:52Z", "modified_at": "2022-08-03T09:28:52Z", "is_active": false },
  { "id": 4, "project": "Project 3", "author": "alla", "text": "4-я заметка", "created_at": "2022-08-04T12:48:53Z", "modified_at": "2022-08-04T12:49:00Z", "is_active": true },
]

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class ToDosFilter extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.debug
      ? ({ 'id': this.props.params.id, 'todos': filter_todos })
      : { 'id': this.props.params.id, 'todos': [], }
  }
  componentDidMount() {
    // http://localhost:8000/api/todo/?project_name=1
    if (!this.props.debug) {
      axios.get('http://localhost:8000/api/todo/?project_name=' + this.state.id)
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
        <h3>Список ToDo для проекта {this.state.id}</h3>
        <ToDosRepr todos={this.state.todos} />
      </div>
    );
  }
}
export default withParams(ToDosFilter);
