import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import ProjectSummary from "../../components/projectSummary/ProjectSummary"
import ProjectComments from "../../components/projectComments/ProjectComments"

const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument("project", id);


  if(error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
   return <div className="loading">Loading...</div>
  }

  return(
    <div className="project-details">
     <ProjectSummary project={document}/>
     <ProjectComments project={document}/>
    </div>
  );
};

export default Project;
