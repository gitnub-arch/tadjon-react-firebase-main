import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import "./Create.css";
import { useCollection } from "../../hooks/useCollection";
import { AuthContext } from "../../context/AuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "developmen", label: "Разработка" },
  { value: "design", label: "Дизайн" },
  { value: "sales", label: "Продажи" },
  { value: "marketing", label: "Маркетинг" },
];

const Create = () => {
  const { user } = useContext(AuthContext);
  const { documents } = useCollection("users");
  const { addDocument } = useFirestore("project");
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setFormError("Please select a project category.");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please select a project category.");
      return;
    }

    const assignedUsersList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      assignedUsersList,
      createdBy,
      comments: [],
    };

    try {
      await addDocument(project);
      navigate("/");
    } catch (err) {
      setFormError(err.message);
    }

    setName("");
    setDetails("");
    setDueDate("");
  };

  const getUsersList = () => {
    if (documents) {
      const mappedUsers = documents.map((user) => {
        return {
          value: { ...user, id: user.id },
          label: user.displayName,
        };
      });
      setUsers(mappedUsers);
    }
  };

  useEffect(() => {
    getUsersList();
  }, [documents]);

  return (
    <div className="create-form">
      <h2 className="page-title">New project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name project:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Detail project:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Dedlain:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Type project:</span>
          <Select
            options={categories}
            onChange={(options) => setCategory(options)}
          />
        </label>
        <label>
          <span>Naznachyt:</span>
          <Select
            options={users}
            onChange={(options) => setAssignedUsers(options)}
            isMulti
          />
        </label>
        <button className="btn">Create Project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
