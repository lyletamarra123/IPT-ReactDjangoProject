import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SubjectTable.css';

function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/subjects/')
      .then(response => setSubjects(response.data));

    axios.get('http://localhost:8000/api/colleges/')
      .then(response => setColleges(response.data));
  }, []);

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
