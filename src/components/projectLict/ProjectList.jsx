import React from "react";
import "./ProjectList.css";
import { Link } from "react-router-dom";
import Avatar from "../avatar/Avatar";

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No project</p>}
      {projects.map((project) => {
        return (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Dedline{project.dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
              <p>
                <strong>Performers:</strong>
              </p>
              <ul>
                {project?.assignedUsersList?.map((user) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectList;
