import React from "react";
import "./index.css";
// import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";


import CollegeTable from "./views/CollegeTable";
import SubjectTable from "./views/SubjectOfferings";
import Enrollment from "./views/EnrollmentPage";
import Status from "./views/EnrollmentStatus";

import AdminLoginPage from "./AdminSide/AdminLogin";
import "./App.css";

function App() {
  return (
    <Router forceRefresh={true}>
      <div className="appContainer">
        <AuthProvider>
          <Navbar />
          <div className="content">
          <Switch>
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <PrivateRoute component={SubjectTable} path="/subject_offerings" exact />
            <PrivateRoute component={Enrollment} path="/enrollment" exact />
            <PrivateRoute component={Status} path="/status" exact />
            <Route component={AdminLoginPage} path="/admin_login"/>
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
          </Switch>
          </div>
        </AuthProvider>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;