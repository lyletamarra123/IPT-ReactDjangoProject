import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/SubjectTable.css';

function EnrolleeList() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/enroll/');
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  return (
    <div>
      <h2 className='subjectoffer-title'>Enrollment List</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subjects Enrolled</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>{enrollment.student_username}</td>
              <td>{enrollment.subjects.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrolleeList;
