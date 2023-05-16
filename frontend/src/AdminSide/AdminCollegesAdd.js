import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/registerPage.css";


function AddCollege() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addCollege } = useContext(AuthContext);
  

  const handleSubmit = async e => {
    e.preventDefault();
    addCollege(title, description);
  };

  return (
    <section className="regSection">
      <form onSubmit={handleSubmit} className="regForm">
        <h1>Add a college</h1>
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
        <div>
          <label htmlFor="description">College Description</label>
          <input
            type="text"
            id="description"
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        <button>Add College</button>
      </form>
    </section>
  );
}

export default AddCollege;