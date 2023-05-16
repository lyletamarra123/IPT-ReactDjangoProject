import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SubjectTable.css';
import { useHistory } from "react-router-dom";

function AdminColleges() {
  const [colleges, setColleges] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setColleges(response.data));
  }, []);

  const handleAddCollege = () => {
    history.push("/admin_colleges/add_college");
  };

  const handleDeleteCollege = () => {
    history.push("/admin_colleges/delete_college");
  };

  return (
    <div>  
      <h2 className='subjectoffer-title'>Colleges</h2>
      <div className="button-container">
        <button className="add-button" onClick={handleAddCollege}>Add College/s</button>
        <button className="delete-button" onClick={handleDeleteCollege}>Delete College/s</button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {colleges.map(college => (
            <tr key={college.title}>
              <td>{college.title}</td>
              <td>{college.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminColleges;
