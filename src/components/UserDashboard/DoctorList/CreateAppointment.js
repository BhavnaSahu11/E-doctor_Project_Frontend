import React, { useState } from "react";
import './CreateAppointment.css'; // Ensure this path is correct

const CreateAppointment = ({ doctorEmail, doctorAvailability, onBack }) => {
  const [formData, setFormData] = useState({
    doctorEmail: doctorEmail, // Pre-fill with the passed doctor's email
    appointmentDate: "",
    reason: "",
    remarks: "",
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if appointment date is within doctor's available range
    const appointmentDate = new Date(formData.appointmentDate);
    const availableFromDate = new Date(doctorAvailability.availableFromDate);
    const availableEndDate = new Date(doctorAvailability.availableEndDate);

    if (appointmentDate < availableFromDate || appointmentDate > availableEndDate) {
      setError(`Appointment date must be between Doctor Schedule That is ${doctorAvailability.availableFromDate} and ${doctorAvailability.availableEndDate}.`);
      return;
    }

    const appointmentData = {
      doctorEmail: formData.doctorEmail,
      appointmentDate: formData.appointmentDate,
      reason: formData.reason,
      remarks: formData.remarks,
    };

    fetch("http://localhost:8080/appointments/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointmentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage("Appointment created successfully!");
        setFormData({
          doctorEmail: doctorEmail, // Reset doctor email
          appointmentDate: "",
          reason: "",
          remarks: "",
        });
        setError(null);
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch((error) => {
        console.error("Error creating appointment:", error);
        setError("Failed to create appointment. Please try again.");
        setSuccessMessage(null);
      });
  };

  return (
    <div className="create-appointment-container">
      <h2>Create Appointment</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorEmail">Doctor Email:</label>
          <input
            type="email"
            id="doctorEmail"
            name="doctorEmail"
            value={formData.doctorEmail}
            readOnly // Make the field read-only
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date:</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks:</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Book Appointment</button>
        <button type="button" onClick={onBack} className="back-button">
          Back to Doctor List
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
