import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SubjectTable.css';
import { useHistory } from "react-router-dom";

function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:8000/api/subjects/')
      .then(response => setSubjects(response.data));

    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setColleges(response.data));
  }, []);

  const handleAddSubject = () => {
    history.push("/admin_subjects/add_subject");
  };

  const handleDeleteSubject = () => {
    history.push("/admin_subjects/delete_subject");
  };

  return (
    <div>
      <h2 className='subjectoffer-title'>Subjects</h2>
      <div>
        <label htmlFor="college-select" className='subjectoffer-label'>Select a college:</label>
        <select
          id="college-select"
          value={selectedCollege}
          onChange={event => setSelectedCollege(event.target.value)}
        >
          <option value="">ALL</option>
          {colleges.map(college => (
            <option key={college.id} value={college.title}>
              {college.title}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button className="add-button" onClick={handleAddSubject}>Add Subject/s</button>
        <button className="delete-button" onClick={handleDeleteSubject}>Delete Subject/s</button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Offer Code</th>
            <th>Course Number</th>
            <th>Title</th>
            <th>Units</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {subjects
            .filter(subject => !selectedCollege || subject.college_title === selectedCollege)
            .map(subject => (
              <tr key={subject.offerCode}>
                <td>{subject.offerCode}</td>
                <td>{subject.course_number}</td>
                <td>{subject.title}</td>
                <td>{subject.units}</td>
                <td>{subject.college_title}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSubjects;
