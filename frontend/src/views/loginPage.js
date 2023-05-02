import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/loginPage.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section className="loginSection">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Login </h1>
        <hr />
        <label htmlFor="username">Studen Number</label>
        <input type="text" id="username" placeholder="Enter student number" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default LoginPage;