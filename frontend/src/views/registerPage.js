import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/registerPage.css";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, firstName, lastName, college, degreeProgram, yearLevel, password, password2);
  };

  return (
    <section className="regSection">
      <form onSubmit={handleSubmit} className="regForm">
        <h1>Register an account</h1>
        <hr />
        <div>
          <label htmlFor="username">Student Number</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
            placeholder="Student Number"
            required
          />
        </div>
        <div>
          <label htmlFor="password">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="password">College</label>
          <input
            type="text"
            id="college"
            onChange={e => setCollege(e.target.value)}
            placeholder="College"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Degree Program</label>
          <input
            type="text"
            id="degreeprogram"
            onChange={e => setDegreeProgram(e.target.value)}
            placeholder="Degree Program"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Year Level</label>
          <input
            type="text"
            id="yearlevel"
            onChange={e => setYearLevel(e.target.value)}
            placeholder="Year Level"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={e => setPassword2(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p>{password2 !== password ? "Passwords do not match" : ""}</p>
        </div>
        <button>Register</button>
      </form>
    </section>
  );
}

export default Register;