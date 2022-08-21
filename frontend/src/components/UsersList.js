import React, { Component } from 'react';
import axios from 'axios';

import UsersRepr from './UsersRepr.js'

const dbg_users = [
  { "id": 1, "username": "ivan", "first_name": "Иван", "last_name": "Иванов", "email": "sssv@mail.ru" },
  { "id": 2, "username": "alla", "first_name": "Алла", "last_name": "Петрова", "email": "alla@mail.ru" },
]

export default class UsersList extends Component {
  constructor(props) {
    super(props)
    this.state = this.props.debug ? ({ 'users': dbg_users }) : { 'users': [], }
  }

  componentDidMount() {
    if (!this.props.debug) {
      axios.get('http://127.0.0.1:8000/api/users/')
        // axios.get('localhost:8000/api/users/')
        .then(response => {
          const users = response.data
          this.setState({
            'users': users
          })
        }
        ).catch(error => console.log(error))
    }
  }


  render() {
    return (
      <div>
        <h3>Список пользователей</h3>
        <UsersRepr users={this.state.users} />
      </div>
    );
  }
}