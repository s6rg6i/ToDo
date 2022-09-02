import React from 'react'
import axios from 'axios';
import './App.css';
import { Header, Footer } from './components/Header.js';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import Login from './components/Login.js'
import LogOut from './components/Logout.js'
import ToDoList from './components/ToDoList.js'
import ToDoFilter from './components/ToDoFilter.js'
import NotFound404 from './components/NotFound404.js'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        console.log('App constructor')
        this.state = {
            'token': localStorage.getItem('token'),
            'username': localStorage.getItem('username'),
            'users': [],
            'projects': [],
            'todo': [],
        }
    }

    obtainAuthToken(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', { 'username': login, 'password': password })
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('username', login)
                this.setState({ 'token': token, 'username': login }, this.getData)
            })
            .catch(error => console.log(error));
    }

    logout() {
        localStorage.setItem('token', '')
        localStorage.setItem('username', '')
        this.setState({
            'username': '',
            'token': '',
            'users': [],
            'projects': [],
            'todo': [],
        })
    }

    getData() {
        let headers = (this.state.token) ? { 'Authorization': 'token ' + this.state.token } : {}
        axios.get('http://127.0.0.1:8000/api/users/', { headers })
            .then(response => { this.setState({ 'users': response.data }) })
            .catch(error => { console.log(error) })

        axios.get('http://127.0.0.1:8000/api/project/', { headers })
            .then(response => { this.setState({ 'projects': response.data }) })
            .catch(error => { console.log(error) })

        axios.get('http://127.0.0.1:8000/api/todo/', { headers })
            .then(response => { this.setState({ 'todo': response.data }) })
            .catch(error => { console.log(error) })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <BrowserRouter>
                <Header username={this.state.username} />
                <Routes>
                    <Route exact path='/' element={<Navigate to='/users/' />} />
                    <Route exact path='/users/' element={<UserList users={this.state.users} />} />
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                    <Route path='/projects/:id' element={<ToDoFilter todos={this.state.todo} projects={this.state.projects} />} />
                    <Route exact path='/todo' element={<ToDoList todos={this.state.todo} projects={this.state.projects} />} />
                    <Route exact path='/login' element={<Login obtainAuthToken={(login, password) => this.obtainAuthToken(login, password)} />} />
                    <Route exact path='/logout' element={<LogOut logout={() => this.logout()} />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}
