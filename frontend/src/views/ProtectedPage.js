import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

import '../css/academicPage.css';
import subj from '../images/enrollSubj2.png';
import enroll from '../images/enroll.png';
import status from '../images/status.png';

import ReactDOM from "react-dom";

const subjectOfferings = [
  {
    college: "CICCT",
    subjects: [
      {
        offerCode: "PROG1",
        courseNumber: "IT 112",
        title: "Introduction to Programming",
        units: 3,
      },
      {
        offerCode: "ICOMP",
        courseNumber: "IT 120",
        title: "Introduction to Computing",
        units: 3,
      },
      // add more subjects for CICCT here
    ],
  },
  {
    college: "CAS",
    subjects: [
      {
        offerCode: "NATSCI1",
        courseNumber: "NS 101",
        title: "Natural Science 1",
        units: 3,
      },
      {
        offerCode: "STS",
        courseNumber: "HIST 101",
        title: "Science, Technology, and Society",
        units: 3,
      },
      // add more subjects for CAS here
    ],
  },
  // add more colleges and subjects here
];

function PopupContent({ onClose }) {
  const [selectedCollege, setSelectedCollege] = useState("");
  const selectedSubjects =
    selectedCollege &&
    subjectOfferings.find((offering) => offering.college === selectedCollege)
      ?.subjects;

  const handleCollegeSelect = (event) => {
    setSelectedCollege(event.target.value);
  };

  return (
    <div className="popup-content">
      <h2>Subject Offerings</h2>
      <label>
        College:
        <select value={selectedCollege} onChange={handleCollegeSelect}>
          <option value="">-- Select a college --</option>
          {subjectOfferings.map((offering) => (
            <option key={offering.college} value={offering.college}>
              {offering.college}
            </option>
          ))}
        </select>
      </label>
      {selectedSubjects && (
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
            {selectedSubjects.map((subject) => (
              <tr key={subject.offerCode}>
                <td>{subject.offerCode}</td>
                <td>{subject.courseNumber}</td>
                <td>{subject.title}</td>
                <td>{subject.units}</td>
                <td>{selectedCollege}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br></br>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/test/");
        setRes(response.data.response);
      } catch {
        setRes("Something went wrong");
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleCardClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    // <div>
    //   <h1>Projected Page</h1>
    //   <p>{res}</p>
    // </div>
    <div>
      <h1 className="tabHeader">Academic Options</h1>
      <div className="mainContainer">
        <br></br>
        <div class="card" onClick={handleCardClick}>
          <div class="container">
            <img src={subj} alt="enrollsubj" />
            <h4><b>Subject Offerings</b></h4>
          </div>
        </div>
        {showPopup && (
        ReactDOM.createPortal(
          <PopupContent onClose={handleClosePopup} />,
          document.body
        )
      )}
        <div class="card">
          <div class="container">
            <img src={enroll} alt="enrollsubj" />
            <h4><b>Enroll</b></h4>
          </div>
        </div>
        <div class="card">
          <div class="container">
            <img src={status} alt="enrollsubj" />
            <h4><b>View Enroll Status</b></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedPage;