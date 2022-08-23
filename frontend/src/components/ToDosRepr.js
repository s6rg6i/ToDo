import './Table.css'

const ToDoItem = ({ todo }) => {
  return (
    <tr>
      <td className='cadre-td'>{todo.project}</td>
      <td className='cadre-td'>{todo.text}</td>
      <td className='cadre-td'>{todo.is_active ? "☑" : "☐"}</td>
    </tr>
  )
}

const ToDosRepr = ({ todos }) => {
  return (
    <div className='cadre'>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Project</th>
        <th className='cadre-th'>Text</th>
        <th className='cadre-th'>Is active</th>
        {todos.map((todo) => <ToDoItem todo={todo} />)}
      </table>
    </div>
  )
}
export default ToDosRepr