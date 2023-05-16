import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/registerPage.css";


function DeleteSubject() {
  const [offerCode, setOfferCode] = useState("");
  const { deleteSubject } = useContext(AuthContext);
  

  const handleSubmit = async e => {
    e.preventDefault();
    deleteSubject(offerCode);
  };

  return (
    <section className="regSection">
      <form onSubmit={handleSubmit} className="regForm">
        <h1>Delete a subject</h1>
        <hr />
        <div>
          <label htmlFor="offerCode">Subject Offer Code</label>
          <input
            type="text"
            id="offerCode"
            onChange={e => setOfferCode(e.target.value)}
            placeholder="Subject Offer Code"
            required
          />
        </div>
        <button>Delete Subject</button>
      </form>
    </section>
  );
}

export default DeleteSubject;