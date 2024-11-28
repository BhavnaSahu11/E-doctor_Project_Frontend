import React, { useState } from "react";
import "./CreateAppointment.css";

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    appointmentId: "",
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentStatus: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your API call here
  };

  return (
    <div className="create-appointment-container">
      <h1 className="form-title">Create Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="appointmentId">Appointment Id</label>
          <input
            type="text"
            id="appointmentId"
            name="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientId">Patient Id</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorId">Doctor Id</label>
          <input
            type="text"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date</label>
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
          <label htmlFor="appointmentStatus">Appointment Status</label>
          <input
            type="text"
            id="appointmentStatus"
            name="appointmentStatus"
            value={formData.appointmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="remark">Remark</label>
          <textarea
            id="remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;
