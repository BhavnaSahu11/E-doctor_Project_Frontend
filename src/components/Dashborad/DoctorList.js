import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DoctorList.css"; // Custom CSS for Doctor List

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/get-all-doctors")
      .then((response) => {
        setDoctors(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setError("Failed to fetch doctor list.");
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (doctors.length === 0) {
    return <div className="loading">Loading doctor list...</div>;
  }

  return (
    <div className="doctor-list-container">
  <div className="doctor-cards">
    {doctors.map((doctor, index) => (
      <div className="doctor-card" key={index}>
        <div className="doctor-image-container">
          <img
            src={`assets/img/${
              doctor.email.includes("male") ? "femaledoctor.png" : "maledoctor.png"
            }`}
            alt="Doctor"
            className="doctor-image"
          />
        </div>
        <div className="doctor-details">
          <p><strong>{doctor.doctorName || "Profile Not Updated"}</strong></p>
          <p>Email: {doctor.email}</p>
          <p>Speciality: {doctor.speciality || "Not specified"}</p>
          <p>Location: {doctor.location || "Not specified"}</p>
          <p>Mobile: {doctor.mobileNo || "Not provided"}</p>
          <p>Hospital: {doctor.hospitalName || "Not specified"}</p>
          <p>Charge per Visit: ₹{doctor.chargedPerVisit || 0}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default DoctorList;
