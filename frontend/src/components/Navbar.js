import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import UserInfo from "../components/UserInfo";
import "../css/Navbar.css";
import { useNav } from "../hooks/use-nav";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const isAdmin = user?.username === "admin" ?? false; // Assuming 'is_admin' property exists in the user object
  const {navigations} = useNav(isAdmin);
  return (
    <nav>
      <div>
        <h1>Student Enrollment System</h1>
        <div>

          {user ? (
            <>
              <p>{user && <UserInfo user={user} />}</p>
              {navigations}
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
