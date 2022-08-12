import React from 'react'
import axios from 'axios'
import UserList from './components/userlist.js'
import Header from './components/header.js'
import Footer from './components/footer.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios
        .get('http://127.0.0.1:8000/api/users/')
        .then(response => {
            const users = response.data
            this.setState(
                {
                    'users': users
                }
            )
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <main role="main">
                <Header />
                <div className="container">
                    <UserList users={this.state.users} />
                </div>
                <Footer />
            </main>
        )
    }
}

export default App;
