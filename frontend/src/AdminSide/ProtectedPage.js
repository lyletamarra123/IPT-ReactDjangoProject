import { useEffect, useState} from "react";
import useAxios from "../utils/useAxios";
import { useHistory } from "react-router-dom";

import '../css/academicPage.css';
import subj from '../images/enrollSubj2.png';
import enroll from '../images/enroll.png';
import status from '../images/status.png';

function ProtectedPage() {
  const [res, setRes] = useState("");
  const api = useAxios();
  const history = useHistory();

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


  const handleCard1Click = () => {
    history.push("/admin_subjects");
  };

  const handleCard2Click = () => {
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
            <img src={enroll} alt="enrollsubj" />
            <h4><b>Colleges</b></h4>
          </div>
        </div>
        <div class="card">
          <div class="container">
            <img src={status} alt="enrollsubj" />
            <h4><b>List Of Enrollees</b></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedPage;