import React, { useContext, useState } from "react";
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/projectLict/ProjectList";
import ProjectFilter from "../../components/projectFilter/ProjectFilter";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const { documents, error } = useCollection("project");
  const [currentFilter, setCurrentFilter] = useState("all");

  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all": return true;
          case "developmen":
          case "design":
          case "sales":
          case "marketing":
            return document.category === currentFilter;
            case "mine":
              return document.assignedUsersList.find((u) => u.id === user.uid);
              default:
                return true;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      )}
      {documents && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
