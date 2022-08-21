import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        // <div>
        <ul className='nav-ul'>
            <li className='nav-li'><Link to='/users' className='nav-a'>Users</Link></li>
            <li className='nav-li'><Link to='/projects' className='nav-a'>Projects</Link></li>
            <li className='nav-li'><Link to='/todos' className='nav-a'>ToDos</Link></li>
        </ul>
        // </div >
    )
}
export default Header;