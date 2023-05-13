import React, { useState, useEffect } from 'react';

function CollegeTable() {
  const [colleges, setColleges] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/colleges/')
      .then(response => response.json())
      .then(data => setColleges(data));

    fetch('http://localhost:8000/api/subjects/')
      .then(response => response.json())
      .then(data => setSubjects(data));
  }, []);

  return (
    <div>
      <h2>Colleges</h2>
      <table>
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

      <h2>Subjects</h2>
      <table>
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
          {subjects.map(subject => (
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

export default CollegeTable;
