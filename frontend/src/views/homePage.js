import React, { useContext, useState, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";

import { Link } from "react-router-dom";
import dash1 from '../images/dash1.jpg';
import dash2 from '../images/dash2.jpg';
import dash3 from '../images/dash3.jpg';
import dash4 from '../images/dash4.jpg';
import "../css/homePage.css";

const images = [
    dash1,
    dash2,
    dash3,
    dash4
];

const Home = () => {
  // const { user } = useContext(AuthContext);
  // return (
  //   <section>
  //     {user && <UserInfo user={user} />}
  //     <h1>You are on home page!</h1>
  //   </section>
  // );

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
      const intervalId = setInterval(() => {
          setCurrentImage((currentImage + 1) % images.length);
      }, 5000);

      return () => clearInterval(intervalId);
  }, [currentImage]);

  return (
      <div className="carousel">
          <img src={images[currentImage]} alt="carousel image" />
          <div>
              <span><i>Enroll with Confidence: Your Future Starts Here</i></span>
              <p>
                  We are delighted to offer you a convenient and efficient way to enroll in our esteemed institution. Our enrollment system is designed to provide a seamless experience for students, whether you are a new or returning student.
                  Our institution is committed to providing quality education and creating an environment that fosters learning and personal growth. Our highly qualified faculty members are dedicated to helping you achieve your academic and career goals. We offer a wide range of programs that are designed to meet the needs of students from diverse backgrounds and interests.
                  Whether you are interested in pursuing a degree, certificate, or diploma, our institution provides an opportunity for you to acquire the knowledge and skills necessary for success in your chosen career path. We also offer a range of extracurricular activities that provide opportunities for students to develop leadership skills, build relationships, and engage with their community.
              </p>
              <Link to="/protected" className="enrollNow button">Enroll Now!</Link>
          </div>
      </div>

  );
};

export default Home;