import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserInfo from "../components/UserInfo";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <nav>
      <div>
        <h1>Student Enrollment System</h1>
        <div>
          {user ? (
            <>
              <p>{user && <UserInfo user={user} />}</p>
              <Link to="/">Home</Link>
              <Link to="/protected">Academics</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;