// src/components/UserDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserDashboard.css";
import EditProfile from "../Dashborad/EditProfile";
import CreateAppointment from "./CreateAppointment";
// import Appointments from "./Appointments";
// import PrescriptionList from "./PrescriptionList";

const UserDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState({
    userName: "",
    age: "",
    location: "",
    mobileNo: "",
    insuranceDetails: "",
  });

  // Fetch user's email
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/get-welcome-email")
      .then((response) => {
        setUserEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching email:", error);
        setUserEmail("Error fetching email");
      });
  }, []);

  // Fetch user's profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/profile")
      .then((response) => {
        setUserProfile(response.data); // Populate userProfile with backend data
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <img
            src="assets/img/maleuser.png"
            alt="User"
            className="profile-picture"
          />
          <p className="user-name">
            {userProfile.userName || "Loading Name..."}
          </p>
        </div>
        <ul className="menu-list">
          {[
            "Dashboard",
            "Edit Profile",
            "Appointments",
            "Prescriptions",
            "Doctors",
            "Health Records",
            "Settings",
          ].map((menu) => (
            <li
              key={menu}
              className={selectedMenu === menu ? "menu-item active" : "menu-item"}
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="User-navbar">
          <ul>
            <li>
              <a href="/user-dashboard">Home</a>
            </li>
            <li>
              <span>Welcome {userEmail || "Loading..."}</span>
            </li>
            <li>
              <a href="/WelcomePage">Logout</a>
            </li>
          </ul>
        </div>

        {/* Header */}
        <div className="header">
          <h1>{selectedMenu}</h1>
        </div>

        {/* Content */}
        <div className="cards-container">
          {selectedMenu === "Dashboard" && (
            <>
              <div className="card">
                <h2>Upcoming Appointments</h2>
                <p>2</p>
              </div>
              <div className="card">
                <h2>Health Records</h2>
                <p>5 records</p>
              </div>
              <div className="card">
                <h2>Prescriptions</h2>
                <p>8 prescriptions</p>
              </div>
            </>
          )}

          {selectedMenu === "Edit Profile" && (
            <EditProfile userProfile={userProfile} setUserProfile={setUserProfile} />
          )}

          {selectedMenu === "Appointments" && <CreateAppointment />} 

          {/* {selectedMenu === "Prescriptions" && <PrescriptionList />} Render PrescriptionList */}

          {selectedMenu !== "Dashboard" && selectedMenu !== "Edit Profile" && selectedMenu !== "Appointments" && selectedMenu !== "Prescriptions" && (
            <div className="dynamic-content">
              <p>
                Showing details for: <strong>{selectedMenu}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
