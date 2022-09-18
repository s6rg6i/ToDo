import './Table.css'

const ToDoItem = ({ todo, projects }) => {
  const name = projects.find(el => el.id === todo.project).title  // Название проекта по id
  return (
    <tr>
      <td className='cadre-td'>{name}</td>
      <td className='cadre-td'>{todo.text}</td>
      <td className='cadre-td'>{todo.is_active ? "☑" : "☐"}</td>
    </tr>
  )
}

const ToDoList = ({ todos, projects }) => {
  return (
    <div className='cadre'>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Project</th>
        <th className='cadre-th'>Text</th>
        <th className='cadre-th'>Is active</th>
        {todos.map((todo) => <ToDoItem todo={todo} projects={projects} />)}
      </table>
    </div>
  )
}

export default ToDoList;
