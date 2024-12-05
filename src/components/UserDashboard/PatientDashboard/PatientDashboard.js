import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientDashboard.css";
import EditPatientProfile from "../EditProfile/EditPatientProfile";
import AppointmentsList from '../Appointment/AppointmentsList';
import DoctorList from "../DoctorList/DoctorList";


const PatientDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [userProfile, setUserProfile] = useState({
    patientName: "",
    mobileNo: "",
    bloodGroup: "",
    gender: "",
    age: "",
    address: "",
  });

  // Function to fetch user's email
  const fetchUserEmail = () => {
    axios
      .get("http://localhost:8080/api/patient/get-welcome-email")
      .then((response) => {
        setUserEmail(response.data.email || "Unknown Email");
      })
      .catch((error) => {
        console.error("Error fetching email:", error);
        setUserEmail("Error fetching email");
      });
  };

  // Function to fetch user's profile
  const fetchUserProfile = () => {
    axios
      .get("http://localhost:8080/api/patient/profile")
      .then((response) => {
        setUserProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };

  // Fetch data on component load
  useEffect(() => {
    fetchUserEmail();
    fetchUserProfile();
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
            {userProfile.patientName || "Loading Name..."}
          </p>
        </div>
        <ul className="menu-list">
          {[
            "Dashboard",
            "Edit Profile",
            "My Appointments",
            "Prescriptions",
            "Doctors List",
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
            <EditPatientProfile
              refreshData={() => {
                fetchUserEmail();
                fetchUserProfile();
              }}
            />
          )}


          {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

          {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}


          {/* If menu is not Dashboard, Edit Profile, Appointments or Doctor List */}
          {selectedMenu !== "Dashboard" &&
            selectedMenu !== "Edit Profile" &&
            selectedMenu !== "My Appointments" && 
            selectedMenu !== "Doctors List" &&(
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

export default PatientDashboard;