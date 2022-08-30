import { Link } from 'react-router-dom'
import './Header.css'


export const Header = ({ username }) => {
  const [name, button] = (username) ? [username, '/logout'] : ['unregistered', '/login']
  return (
    <div className="topnav">
      <Link to='/users'>Users</Link>
      <Link to='/projects'>Projects</Link>
      <Link to='/todo'>ToDo</Link>
      <div className="login-container">
        <Link className="button" to={button}>{button.substring(1)}</Link>
        <label>{name}</label>
      </div>
    </div>
  )
}

export const Footer = () =>
  <div className='footnav' >
    Copiright &copy; ToDo
  </div>
