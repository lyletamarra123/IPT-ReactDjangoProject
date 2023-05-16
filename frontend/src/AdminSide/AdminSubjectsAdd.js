import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from 'axios';
import "../css/registerPage.css";


function AddSubjectOffer() {
    const [offerCode, setOfferCode] = useState("");
    const [courseNumber, setCourseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [units, setUnits] = useState("");
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const { addSubject } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:8000/api/colleges/')
            .then(response => setColleges(response.data));
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        addSubject(offerCode, courseNumber, title, units, selectedCollege);
    };

    return (
        <section className="regSection">
            <form onSubmit={handleSubmit} className="regForm">
                <h1>Add a subject</h1>
                <hr />
                <div>
                    <label htmlFor="offerCode">Offer Code</label>
                    <input
                        type="text"
                        id="offerCode"
                        onChange={e => setOfferCode(e.target.value)}
                        placeholder="Offer Code"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="course_number">Course Number</label>
                    <input
                        type="text"
                        id="course_number"
                        onChange={e => setCourseNumber(e.target.value)}
                        placeholder="Course Number"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="units">Units</label>
                    <input
                        type="text"
                        id="units"
                        onChange={e => setUnits(e.target.value)}
                        placeholder="Units"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="college_title">College</label>
                    <select
                        id="college_title"
                        value={selectedCollege}
                        onChange={event => setSelectedCollege(event.target.value)}
                    >
                        {colleges.map(college => (
                            <option key={college.id} value={college.title}>
                                {college.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button>Add Subject</button>
            </form>
        </section>
    );
}

export default AddSubjectOffer;