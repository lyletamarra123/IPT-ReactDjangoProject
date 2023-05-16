import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SubjectTable.css';

function AdminColleges() {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setColleges(response.data));
  }, []);

  return (
    <div>
      <h2 className='subjectoffer-title'>Colleges</h2>
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
