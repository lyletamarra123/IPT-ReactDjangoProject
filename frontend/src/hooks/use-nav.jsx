import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export const useNav = (isAdmin) => {
    const [navigations, setNavigations] = useState([]);

    useEffect(() => {
        if(isAdmin){
            setNavigations([
                <Link to="/">Home</Link>,
                <Link to="/admin_panel">Admin Panel</Link>,
            ]);
        } else {
            setNavigations([
                <Link to="/">Home</Link>,
              <Link to="/protected">Academics</Link>,
              <Link to="/subject_offerings">Subject Offerings</Link>,
              <Link to="/enrollment">Enroll</Link>,
              <Link to="/status">Enrollment Status</Link>,
              
            ])
        }
    }, [isAdmin])


    return {navigations}
}