import React from 'react'
import axios from 'axios';
import './App.css';
import { Header, Footer } from './components/Header';
import UserList from './components/UserList.js'
import ProjectList from './components/ProjectList.js'
import CreateProject from './components/CreateProject.js'
import DeleteProject from './components/DeleteProject.js'
import CreateToDo from './components/CreateToDo.js'
import DeleteToDo from './components/DeleteToDo.js'
import Login from './components/Login.js'
import LogOut from './components/Logout.js'
import ToDoFilter  from './components/ToDoFilter'
import ToDoList from './components/ToDoList'
import NotFound404 from './components/NotFound404.js'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'


export default class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			'token': localStorage.getItem('token'),
			'username': localStorage.getItem('username'),
			'users': [],
			'projects': [],
			'todo': [],
		}
	}

	deleteProject(projId, headers = this.getHeaders()) {
		axios
			.delete(`http://127.0.0.1:8000/api/project/${projId}`, { headers })
			.then(response => { this.setState({ 'projects': this.state.projects.filter((project) => project.id !== projId) }) })
			.catch(error => { console.log(error) })
	}

	createProject(title, repo, users, headers = this.getHeaders()) {
		axios
			.post('http://127.0.0.1:8000/api/project/', { 'title': title, 'repository_url': repo, 'users': users }, { headers })
			.then(response => { this.loadData() })
			.catch(error => { console.log(error) })
	}

	deleteToDo(todoId, headers = this.getHeaders()) {
		console.log("--deleteToDo--:", todoId)
		axios
			.delete(`http://127.0.0.1:8000/api/todo/${todoId}`, { headers })
			.then(response => { this.setState({ 'todo': this.state.todo.filter((todo_) => todo_.id !== todoId) }) })
			.catch(error => { console.log(error) })
	}

	createToDo(text, proj_id, headers = this.getHeaders()) {
		let author = this.state.users.find(a => a.username === this.state.username)  // зарегестрированный пользователь
		axios
			.post('http://127.0.0.1:8000/api/todo/', { 'text': text, 'project': proj_id, 'author': author.id }, { headers })
			.then(response => { this.loadData() })
			.catch(error => { console.log(error) })
	}

	obtainAuthToken(login, password) {
		axios
			.post('http://localhost:8000/api-auth-token/', { 'username': login, 'password': password })
			.then(response => {
				const token = response.data.token
				localStorage.setItem('token', token)
				localStorage.setItem('username', login)
				this.setState({ 'token': token, 'username': login }, this.loadData)
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

	getHeaders() {
		return (this.state.token) ? { 'Authorization': 'token ' + this.state.token } : {}
	}

	loadData(headers = this.getHeaders()) {
		axios.get('http://localhost:8000/api/users/', { headers })
			.then(response => { this.setState({ 'users': response.data }) })
			.catch(error => { console.log(error) })

		axios.get('http://localhost:8000/api/project/', { headers })
			.then(response => { this.setState({ 'projects': response.data }) })
			.catch(error => { console.log(error) })

		axios.get('http://localhost:8000/api/todo/', { headers })
			.then(response => { this.setState({ 'todo': response.data }) })
			.catch(error => { console.log(error) })
	}

	componentDidMount() {
		this.loadData()
	}

	render() {
		return (
			<BrowserRouter>
				<Header username={this.state.username} />
				<Routes>
					<Route exact path='/' element={<Navigate to='/users/' />} />
					<Route exact path='/users/' element={<UserList users={this.state.users} />} />
					<Route exact path='/projects' element={<ProjectList projects={this.state.projects} users={this.state.users} />} />
					<Route exact path='/projects/create' element={
						<CreateProject users={this.state.users} createProject={(title, repo, users) => this.createProject(title, repo, users)} />} />
					<Route exact path='/projects/delete' element={
						<DeleteProject projects={this.state.projects} deleteProject={(projId) => this.deleteProject(projId)} />} />
					<Route path='/projects/:id' element={<ToDoFilter todos={this.state.todo} projects={this.state.projects} />} />
					<Route exact path='/todo' element={<ToDoList todos={this.state.todo} projects={this.state.projects} />} />
					<Route exact path='/todo/delete' element={
						<DeleteToDo todos={this.state.todo} deleteToDo={(todoId) => this.deleteToDo(todoId)} />} />
					<Route exact path='/todo/create' element={
						<CreateToDo projects={this.state.projects} users={this.state.users}
							createToDo={(text, project, author) => this.createToDo(text, project)} />} />

					<Route exact path='/login' element={<Login obtainAuthToken={(login, password) => this.obtainAuthToken(login, password)} />} />
					<Route exact path='/logout' element={<LogOut logout={() => this.logout()} />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		)
	}
}
