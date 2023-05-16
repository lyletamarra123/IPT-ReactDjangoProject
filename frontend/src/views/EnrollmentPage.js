import React, { useState, useEffect, useContext } from 'react';
import '../css/EnrollmentPage.css';
import AuthContext from '../context/AuthContext';

function Enrollment() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const { authTokens } = useContext(AuthContext);

    useEffect(() => {

        fetch('http://localhost:8000/api/subjects/')
            .then(response => response.json())
            .then(data => setSubjects(data));
    }, []);

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

    const enroll = async (e) => {
        e.preventDefault();
        const totalUnits = getTotalUnits();
        if (totalUnits > 24) {
            alert("You can only enroll up to 24 units.");
        } else {
            const response = await fetch("http://127.0.0.1:8000/api/enroll/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify({ selectedSubjects }),
            });

            if (response.status === 201) {
                alert("Enroll Successful!");
                console.log("Selected subjects:", selectedSubjects);
            } else {
                alert("Something went wrong!");
            }
        }
    };

    return (
        <div>
            <h2 className='enrollment-title'>Select subject/s to enroll:</h2>
            <form onSubmit={enroll}>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Offer Code</th>
                            <th>Course Number</th>
                            <th>Title</th>
                            <th>Units</th>
                            <th>Enroll?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject) => (
                            <tr key={subject.offerCode}>
                                <td>{subject.offerCode}</td>
                                <td>{subject.course_number}</td>
                                <td>{subject.title}</td>
                                <td>{subject.units}</td>
                                <td className='checkbox'>
                                    <input
                                        type="checkbox"  
                                        value={subject.offerCode}
                                        checked={selectedSubjects.includes(subject.offerCode)}
                                        onChange={handleSubjectSelection}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr className='totalunits-data'>
                            <td></td>
                            <td></td>
                            <td>Total Units:</td>
                            <td>{getTotalUnits()}</td>
                            <td className='checkbox'><button type="submit" className='enroll'>Enroll</button></td>
                        </tr>
                    </tbody>
                </table>  
            </form>
        </div>
    );
}

export default Enrollment;
