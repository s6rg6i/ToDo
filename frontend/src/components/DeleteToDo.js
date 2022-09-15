import './Table.css'

const ToDoItem = ({ todo, deleteToDo }) => {
  return (
    <tr>
      <td className='cadre-td'>{todo.id}</td>
      <td className='cadre-td'>{todo.text}</td>
      <td> <button onClick={() => deleteToDo(todo.id)}>Delete</button></td>
    </tr>
  )
}

const DeleteToDo = ({ todos, deleteToDo }) => {
  return (
    <div className='cadre'>
      <h4>Deleting The Project</h4>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Id</th>
        <th className='cadre-th'>Text</th>
        <th className='cadre-th'>Delete</th>
        {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo} />)}
      </table>
    </div>
  )
}

export default DeleteToDo
