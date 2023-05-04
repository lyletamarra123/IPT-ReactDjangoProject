import { useEffect, useState } from "react";
import useAxios from "../utils/useAxios";

import '../css/academicPage.css';
import subj from '../images/enrollSubj2.png';
import enroll from '../images/enroll.png';
import status from '../images/status.png';

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

  return (
    // <div>
    //   <h1>Projected Page</h1>
    //   <p>{res}</p>
    // </div>
    <div>
      <h1 className="tabHeader">Academic Options</h1>
      <div className="mainContainer">
        <br></br>
        <div class="card">
          <div class="container">
            <img src={subj} alt="enrollsubj" />
            <h4><b>Subject Offerings</b></h4>
          </div>
        </div>
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