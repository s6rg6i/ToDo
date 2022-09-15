import './Table.css'

const ProjectItem = ({ project, deleteProject }) => {
  return (
    <tr>
      <td className='cadre-td'>{project.id}</td>
      <td className='cadre-td'>{project.title}</td>
      <td> <button onClick={() => deleteProject(project.id)}>Delete</button></td>
    </tr>
  )
}

const DeleteProject = ({ projects, deleteProject }) => {
  return (
    <div className='cadre'>
      <h4>Deleting The Project</h4>
      <table className='cadre-tbl'>
        <th className='cadre-th'>Id</th>
        <th className='cadre-th'>Title</th>
        <th className='cadre-th'>Delete</th>
        {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
      </table>
    </div>
  )
}

export default DeleteProject
