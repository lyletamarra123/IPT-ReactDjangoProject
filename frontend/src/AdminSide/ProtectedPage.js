
import { useHistory } from "react-router-dom";

import '../css/academicPage.css';
import subj from '../images/enrollSubj2.png';
import enroll from '../images/enroll.png';
import college from '../images/college.png';

function ProtectedPage() {
  const history = useHistory();

  const handleCard1Click = () => {
    history.push("/admin_subjects");
  };

  const handleCard2Click = () => {
    history.push("/admin_colleges");
  };

  const handleCard3Click = () => {
    history.push("/admin_enrollment_list");
  };

  return (
    // <div>
    //   <h1>Projected Page</h1>
    //   <p>{res}</p>
    // </div>
    <div>
      <h1 className="tabHeader">Admin Options</h1>
      <div className="mainContainer">
        <br></br>
        <div class="card" onClick={handleCard1Click}>
          <div class="container">
            <img src={subj} alt="enrollsubj" />
            <h4><b>Subject Offerings</b></h4>
          </div>
        </div>
        <div class="card" onClick={handleCard2Click}>
          <div class="container">
            <img src={college} alt="enrollsubj" />
            <h4><b>Colleges</b></h4>
          </div>
        </div>
        <div class="card" onClick={handleCard3Click}>
          <div class="container">
            <img src={enroll} alt="enrollsubj" />
            <h4><b>List Of Enrollees</b></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedPage;