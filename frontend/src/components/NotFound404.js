import { useLocation } from 'react-router-dom'

const NotFound404 = () => {
  return (
    <div>
      <h3>page "{useLocation().pathname}" not found</h3>
    </div>
  )
}
export default NotFound404