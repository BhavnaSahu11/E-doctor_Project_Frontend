// src/components/DoctorDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorDashboard.css";
import EditProfile from "./EditProfile";
import YourSchedule from "./YourSchedule"; 
import DoctorList from "./DoctorList"; // Import the YourSchedule component

const DoctorDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorProfile, setDoctorProfile] = useState({
    doctorName: "",
    speciality: "",
    location: "",
    mobileNo: "",
    hospitalName: "",
    chargedPerVisit: "",
  });

  // Fetch doctor's email
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/get-welcome-email")
      .then((response) => {
        setDoctorEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching email:", error);
        setDoctorEmail("Error fetching email");
      });
  }, []);

  // Fetch doctor's profile
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/profile")
      .then((response) => {
        setDoctorProfile(response.data); // Populate doctorProfile with backend data
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
            src="assets/img/maledoctor.png"
            alt="Doctor"
            className="profile-picture"
          />
          <p className="doctor-name">
            {doctorProfile.doctorName || "Loading Name..."}
          </p>
        </div>
        <ul className="menu-list">
          {[
            "Dashboard",
            "Edit Profile",
            "Approval Status",
            "Your Schedule", // Add "Your Schedule" to the menu
            "Doctor List",
            "Patients",
            "Appointments",
            "Add Prescriptions",
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
        <div className="Doctor-navbar">
          <ul>
            <li>
              <a href="/doctor-dashboard">Home</a>
            </li>
            <li>
              <span>Welcome {doctorEmail || "Loading..."}</span>
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
                <h2>Appointments</h2>
                <p>2</p>
              </div>
              <div className="card">
                <h2>Total Patients</h2>
                <p>3 patients</p>
              </div>
              <div className="card">
                <h2>Total Slots</h2>
                <p>3 slots</p>
              </div>
            </>
          )}

          {selectedMenu === "Edit Profile" && (
            <EditProfile doctorProfile={doctorProfile} setDoctorProfile={setDoctorProfile} />
          )}

          {selectedMenu === "Your Schedule" && <YourSchedule />} {/* Render YourSchedule here */}

          {selectedMenu === "Doctor List" && <DoctorList />} {/* Render DoctorList */}

          {selectedMenu !== "Dashboard" && selectedMenu !== "Edit Profile" && selectedMenu !== "Your Schedule" && selectedMenu !== "Doctor List" &&(
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

export default DoctorDashboard;
  