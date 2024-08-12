import React, { useContext } from 'react';
import "./ProjectSummary.css";
import Avatar from "../avatar/Avatar";
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProjectSummary = ( { project } ) => {
  const { user } = useContext(AuthContext)
  const { deleteDocument } = useFirestore("project")
  const history = useNavigate()

  const hendleClickDelete = async () => {
   await deleteDocument(project.id)
   history('/')
  }
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p className='due-date'>
          Dedline {project.dueDate?.toDate().toDateString()}
        </p>
        <p className='details'>{project.details}</p>
        <h4>Performers:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL}/>
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
         <button className='btn' onClick={hendleClickDelete}>Finalize</button>
      )}
    </div>
  );
};

export default ProjectSummary