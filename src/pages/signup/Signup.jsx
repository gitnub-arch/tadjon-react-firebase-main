import React, { useState } from "react";
import "./Signup.css";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setThumbnailError("Пожалуйста, выберите файл");
      return;
    }
    if (!selectedFile.type.includes("image")) {
      setThumbnailError("Выбранный файл не являеться картинкой");
      return;
    }
    if (selectedFile.size > 1000000000) {
      setThumbnailError("Размер картинки должен быть меньше 100kb");
      return;
    }

    setThumbnail(selectedFile);
    setThumbnailError(null);

  
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Регистрация</h2>
      <label>
        <span>Почта:</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Пароль:</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
        <span>Имя пользователя:</span>
        <input
          required
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label>
        <span>Аватарка:</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Зарегестрироваться</button>}
      {isPending && <button className="btn" disabled>Загрузка...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
