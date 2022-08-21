import { Link } from 'react-router-dom'
import './Table.css'

const ProjectItem = ({ project }) => {
  return (
    <tr>
      <td className='cadre-td'><Link to={`filter/${project.id}`}>{project.title}</Link></td>
      <td className='cadre-td'>{project.repository_url}</td>
      <td className='cadre-td'>{project.users.join(', ')}</td>
    </tr>
  )
}

const ProjectsRepr = ({ projects }) => {
  return (
    <div className='cadre'>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Title</th>
        <th className='cadre-th'>Repository</th>
        <th className='cadre-th'>Users</th>
        {projects.map((project) => <ProjectItem project={project} />)}
      </table>
    </div>
  )
}
export default ProjectsRepr
