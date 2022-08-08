import React from 'react'
import UserList from './components/userlist.js'
import Header from './components/header.js'
import Footer from './components/footer.js'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [
                {"username": "ivan99", "first_name": "Иван", "last_name": "Иванов", "email": "ivan99@mail.ru"},
                {"username": "alla789","first_name": "Алла","last_name": "Пугачева","email": "alla789@mail.ru"}
            ]
        }
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
