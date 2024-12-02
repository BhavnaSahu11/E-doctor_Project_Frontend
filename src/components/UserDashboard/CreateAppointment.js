import React, { useState } from 'react';

const CreateAppointment = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    doctorEmail: '',
    appointmentDate: '',
    reason: '',
    remarks: ''
  });

  // State for error and success handling
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const appointmentData = {
      doctorEmail: formData.doctorEmail,
      appointmentDate: formData.appointmentDate,
      reason: formData.reason,
      remarks: formData.remarks
    };

    // Send appointment data to the backend
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
      console.log("Appointment created successfully:", data);
      // Set success message
      setSuccessMessage("Appointment created successfully!");
      // Clear the form after submission
      setFormData({
        doctorEmail: '',
        appointmentDate: '',
        reason: '',
        remarks: ''
      });
      setError(null); // Clear any previous errors

      // Optionally hide the success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    })
    .catch((error) => {
      console.error("Error creating appointment:", error);
      setError("Invalid Doctor Email to create appointment.");
      setSuccessMessage(null); // Clear any previous success message
    });
  };

  return (
    <div className="create-appointment-container">
      <h2>Create Appointment</h2>

      {/* Success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="doctorEmail">Doctor Email:</label>
          <input
            type="email"
            id="doctorEmail"
            name="doctorEmail"
            value={formData.doctorEmail}
            onChange={handleChange}
            required
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
      </form>
    </div>
  );
};

export default CreateAppointment;
