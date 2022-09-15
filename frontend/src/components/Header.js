import { Link } from 'react-router-dom'
import './Header.css'

export const Header = ({ username }) => {
  const [user, path, btn_name] = (username) ? [username, '/logout', "Logout"] : ['unregistered', '/login', "Login"]
  return (
    <ul class="nav">
      <li><Link to='/users'>Users</Link></li>
      <li><a href="#">Project</a>
        <ul>
          <li><Link to='/projects'>Read</Link></li>
          <li><Link to='/projects/create'>Create</Link></li>
          <li><Link to='/projects/delete'>Delete</Link></li>
        </ul>
      </li>
      <li><a href="#">Todo</a>
        <ul>
          <li><Link to='/todo'>Read</Link></li>
          <li><Link to='/todo/create'>Create</Link></li>
          <li><Link to='/todo/delete'>Delete</Link></li>
        </ul>
      </li>
      <li>
        <Link to={path}>{btn_name}</Link>
      </li>
      <label>{user}</label>
    </ul>
  )
}

export const Footer = () =>
  <div class='foot'>
    Copyright &copy; SPA 'ToDo'
  </div>
