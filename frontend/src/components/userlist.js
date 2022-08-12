const Body = {
    margin: 0,
    padding: "40px 10px",
    width: "400px",
    background: "#f4fafc"
}
const UserItem = ({ user }) => {
    return (
        <tr>
            <td style={{ padding: "5px", background: "#e4edf6" }}>
                {user.username}
            </td>
            <td style={{ padding: "5px", background: "#e4edf6" }}>
                {user.first_name}
            </td>
            <td style={{ padding: "5px", background: "#e4edf6" }}>
                {user.last_name}
            </td>
            <td style={{ padding: "5px", background: "#e4edf6" }}>
                {user.email}
            </td>
        </tr>
    )
}


const UserList = ({ users }) => {
    return (
        <div name='body' style={Body}>
            <table>
                <th style={{ padding: "5px", background: "#e4edf6" }}>Username</th>
                <th style={{ padding: "5px", background: "#e4edf6" }}>First name</th>
                <th style={{ padding: "5px", background: "#e4edf6" }}>Last name</th>
                <th style={{ padding: "5px", background: "#e4edf6" }}>Email</th>
                {users.map((user) => <UserItem user={user} />)}
            </table>
        </div>
    )
}

export default UserList;
