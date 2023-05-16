import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/EnrollmentPage.css';
import moment from 'moment';

const Status = () => {
  const [enrollments, setEnrollments] = useState([]);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/enroll");
      setEnrollments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <div>
      <h1 className='enrollment-title'>Enrollments</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Subject Offer</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.subjects.join(', ')}</td>
              <td>{moment(enrollment.enrollment_date).format('MMMM Do, YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Status;