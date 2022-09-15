import { Link } from 'react-router-dom'
import './Table.css'

const ProjectItem = ({ project }) => {
  return (
    <tr>
      <td className='cadre-td'><Link to={`${project.id}`}>{project.title}</Link></td>
      <td className='cadre-td'>{project.repository_url}</td>
      <td className='cadre-td'>{project.users.join(", ")} </td>
      {/* <td className='cadre-td'>{project.users.map(userId => users.find(a => a.id === userId).last_name).join(', ')} </td> */}
    </tr>
  )
}

const ProjectList = ({ projects }) => {
  return (
    <div className='cadre'>
      <h4>List Of The Projects</h4>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Title</th>
        <th className='cadre-th'>Repository</th>
        <th className='cadre-th'>Users</th>
        {projects.map((project) => <ProjectItem project={project} />)}
      </table>
    </div>
  )
}

export default ProjectList
