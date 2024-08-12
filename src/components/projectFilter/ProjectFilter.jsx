import React, { useState } from "react";
import "./ProjectFilter.css";

const filterList = [
  "all",
  "mine",
  "developmen",
  "design",
  "marketing",
  "sales",
];

const ProjectFilter = ({currentFilter, setCurrentFilter}) => {

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by: </p>
        {filterList.map((label) => (
          <button
            onClick={() => handleClick(label)}
            className={currentFilter === label ? "active" : ""}
            key={label}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
