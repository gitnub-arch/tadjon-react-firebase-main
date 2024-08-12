import React from "react";
import { useCollection } from "../../hooks/useCollection";
import "./OnlineUsers.css";
import Avatar from "../avatar/Avatar";

const OnlineUsers = () => {
  const { error, documents } = useCollection("users");
  return (
    <div className="user-list">
      <h2>ALL USERS</h2>
      {error && <div>{error}</div>}
      {documents &&
        documents.map((user) => {
          return (
            <div key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          );
        })}
    </div>
  );
};

export default OnlineUsers;
