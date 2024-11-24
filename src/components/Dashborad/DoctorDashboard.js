import React, { useState } from "react";
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/100"
            alt="Doctor"
            className="profile-picture"
          />
          <p className="doctor-name">Dr. John Doe</p>
        </div>
        <ul className="menu-list">
          {["Dashboard", "Edit Profile", "Approval Status", "Your Schedule", "Doctor List", "Patients", "Appointments", "Add Prescriptions"].map((menu) => (
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
        {/* Navbar */}
        <div className="Doctor-navbar">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>Welcome doctor2@gmail.com</span>
            </li>
            <li>
              <a href="/profile">Profile</a>
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
                <h2>Prescriptions</h2>
                <p>2 medications</p>
              </div>
              <div className="card">
                <h2>Total Doctors</h2>
                <p>3 doctors</p>
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
          {selectedMenu !== "Dashboard" && (
            <div className="dynamic-content">
              <p>Showing details for: <strong>{selectedMenu}</strong></p>
              {/* You can add dynamic rendering of content here based on selectedMenu */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
