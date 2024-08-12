import React, { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Авторизация</h2>
      <label>
        <span>Почта:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Пароль:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Войти</button>}
      {isPending && <button className="btn" disabled>Загрузка...</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;