import React, { useContext, useEffect, useRef, useState } from "react";
import "./ProjectComments.css";
import { Timestamp } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { formatDistanceToNow } from "date-fns";
import Avatar from "../avatar/Avatar";
import { ru } from "date-fns/locale";

const ProjectComments = ({ project }) => {
  const { user } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const { updateDocument } = useFirestore("project");

  // Создание рефа для последнего комментария
  const lastCommentRef = useRef(null);

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [project.comments]); // Срабатывает при обновлении комментариев

  const handleSubmit = (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    updateDocument(project?.id, {
      comments: [...project?.comments, commentToAdd],
    });

    setNewComment("");
  };

  return (
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul className="comment-card">
        {project.comments.length > 0 &&
          project.comments.map((comment, index) => (
            <li key={comment.id} className="card-comment" ref={lastCommentRef}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                    locale: ru,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
