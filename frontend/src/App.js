import React from 'react'
import './App.css';
import Header from './components/Header';
import UsersList from './components/UsersList.js'
import ProjectsList from './components/ProjectsList.js'
import ToDosList from './components/ToDosList.js'
import ToDosFilter from './components/ToDosFilter';
import NotFound404 from './components/NotFound404.js'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Footer from './components/Footer';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            debug: false,
        }
    }
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Navigate to='/users/' />} />
                    <Route exact path='/users/' element={<UsersList debug={this.state.debug} />} />
                    <Route exact path='/projects' element={<ProjectsList debug={this.state.debug} />} />
                    <Route path='/projects/filter/:id' element={<ToDosFilter debug={this.state.debug} />} />
                    <Route exact path='/todos' element={<ToDosList debug={this.state.debug} />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        )
    }
}
