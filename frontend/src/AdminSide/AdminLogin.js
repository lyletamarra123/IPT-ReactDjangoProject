import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../css/loginPage.css";

const AdminLoginPage = () => {
  const { loginAdmin } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginAdmin(username, password);
  };

  return (
    <section className="loginSection">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1>Admin Login</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter Password" />
        <button type="submit">Login</button>
        <br></br>
        <br></br>
        <Link to="/login">User Login</Link>
      </form>
    </section>
  );
};

export default AdminLoginPage;