import './Table.css'

const UserItem = ({ user }) => {
  return (
    <tr>
      <td className='cadre-td'>{user.username}</td>
      <td className='cadre-td'>{user.first_name}</td>
      <td className='cadre-td'>{user.last_name}</td>
      <td className='cadre-td'>{user.email}</td>
    </tr>
  )
}

const UsersRepr = ({ users }) => {
  return (
    <div className='cadre'>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Username</th>
        <th className='cadre-th'>First name</th>
        <th className='cadre-th'>Last name</th>
        <th className='cadre-th'>Email</th>
        {users.map((user) => <UserItem user={user} />)}
      </table>
    </div>
  )
}

export default UsersRepr