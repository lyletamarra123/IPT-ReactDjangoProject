import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/registerPage.css";


function DeleteCollege() {
  const [title, setTitle] = useState("");
  const { deleteCollege } = useContext(AuthContext);
  

  const handleSubmit = async e => {
    e.preventDefault();
    deleteCollege(title);
  };

  return (
    <section className="regSection">
      <form onSubmit={handleSubmit} className="regForm">
        <h1>Delete a college</h1>
        <hr />
        <div>
          <label htmlFor="title">College Title</label>
          <input
            type="text"
            id="title"
            onChange={e => setTitle(e.target.value)}
            placeholder="College Title"
            required
          />
        </div>
        <button>Delete College</button>
      </form>
    </section>
  );
}

export default DeleteCollege;