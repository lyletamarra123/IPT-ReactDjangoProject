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

function SubjectOfferings({ onClose }) {
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
      <button onClick={onClose} className="close">
        <i className="fas fa-times">X</i>
      </button>
    </div>
  );
}

function EnrollmentForm({ onClose }) {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const subjects = subjectOfferings.flatMap((offering) => offering.subjects);

  const handleSubjectSelection = (e) => {
    const subject = e.target.value;
    if (e.target.checked) {
      setSelectedSubjects([...selectedSubjects, subject]);
    } else {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    }
  };

  const getTotalUnits = () => {
    let totalUnits = 0;
    selectedSubjects.forEach((subject) => {
      const selectedSubject = subjects.find((s) => s.offerCode === subject);
      if (selectedSubject) {
        totalUnits += selectedSubject.units;
      }
    });
    return totalUnits;
  };

  const enroll = (e) => {
    e.preventDefault();
    const totalUnits = getTotalUnits();
    if (totalUnits > 24) {
      alert("You can only enroll up to 24 units.");
    } else {
      alert("Enroll Successful!");
      console.log("Selected subjects:", selectedSubjects);
      processSelectedSubjects(selectedSubjects, subjectOfferings.flatMap((offering) => offering.subjects));
    }
  };

  return (
    <div className="popup-EFcontent">
      <h2>Enrollment Form</h2>
      <form onSubmit={enroll}>
        <table>
          <thead>
            <tr>
              <th>Offer Code</th>
              <th>Title</th>
              <th>Course Number</th>
              <th>Units</th>
              <th>Enroll</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.offerCode}>
                <td>{subject.offerCode}</td>
                <td>{subject.title}</td>
                <td>{subject.courseNumber}</td>
                <td>{subject.units}</td>
                <td>
                  <input
                    type="checkbox"
                    value={subject.offerCode}
                    checked={selectedSubjects.includes(subject.offerCode)}
                    onChange={handleSubjectSelection}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="enroll">Enroll</button>
      </form>
      <button onClick={onClose} className="close">
        <i className="fas fa-times">X</i>
      </button>
    </div>
  );
}

function processSelectedSubjects(selectedSubjects, subjects) {
  selectedSubjects.forEach((subject) => {
    const { offerCode, courseNumber, title, units } = subjects.find((s) => s.offerCode === subject);
    console.log(`Offer Code: ${offerCode}, Course Number: ${courseNumber}, Title: ${title}, Units: ${units}`);
  });
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

  const [showSOPopup, setshowSOPopup] = useState(false);
  const [showEFPopup, setshowEFPopup] = useState(false);

  const handleCard1Click = () => {
    setshowSOPopup(true);
  };

  const handleCard2Click = () => {
    setshowEFPopup(true);
  };

  const handleCloseSOPopup = () => {
    setshowSOPopup(false);
  };

  const handleCloseEFPopup = () => {
    setshowEFPopup(false);
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
        <div class="card" onClick={handleCard1Click}>
          <div class="container">
            <img src={subj} alt="enrollsubj" />
            <h4><b>Subject Offerings</b></h4>
          </div>
        </div>
        {showSOPopup && (
          ReactDOM.createPortal(
            <SubjectOfferings onClose={handleCloseSOPopup} />,
            document.body
          )
        )}
        <div class="card" onClick={handleCard2Click}>
          <div class="container">
            <img src={enroll} alt="enrollsubj" />
            <h4><b>Enroll</b></h4>
          </div>
        </div>
        {showEFPopup && (
          ReactDOM.createPortal(
            <EnrollmentForm onClose={handleCloseEFPopup} />,
            document.body
          )
        )}
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