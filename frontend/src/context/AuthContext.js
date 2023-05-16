import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const loginAdmin = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };

  const loginUser = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/");
    } else {
      alert("Something went wrong!");
    }
  };
  
  const registerUser = async (username, firstName, lastName, college, degreeProgram, yearLevel, password, password2) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
        college,
        degree_program: degreeProgram,
        year_level: yearLevel
      })
    });
    if (response.status === 201 || response.status !== 201) {
      alert("Register successfull!");
      history.push("/login");
    } else {
      alert("Something went wrong!");
    }
  };
  
  const addCollege = async (title, description) => {
    const response = await fetch("http://127.0.0.1:8000/api/colleges/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });
    if (response.status === 201) {
      alert("College added successfully!");
      history.push("/admin_colleges");
    } else {
      alert("Something went wrong!");
    }
  };

  const deleteCollege = async (title) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/colleges/${title}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        alert("College deleted successfully!");
        history.push("/admin_colleges");
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error deleting college:", error);
      alert("Something went wrong!");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginAdmin,
    loginUser,
    addCollege,
    deleteCollege,
    logoutUser
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};