import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApproveAppointments.css";

const ApproveAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/doctor/appointments")
      .then((response) => {
        setAppointments(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  // Handle appointment approval
  const handleApprove = (id) => {
    axios
      .put(`http://localhost:8080/api/doctor/appointments/approve/${id}`)
      .then(() => {
        alert("Appointment approved successfully!");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving appointment:", error);
        alert("Failed to approve the appointment.");
      });
  };

  // Handle appointment rejection
  const handleReject = (id) => {
    axios
      .put(`http://localhost:8080/api/doctor/appointments/reject/${id}`)
      .then(() => {
        alert("Appointment rejected successfully!");
        setAppointments((prevAppointments) =>
          prevAppointments.filter((appointment) => appointment.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error rejecting appointment:", error);
        alert("Failed to reject the appointment.");
      });
  };

  return (
    <div className="approve-appointments-container">
      <h2>Approve Appointments</h2>
      {appointments.length === 0 ? (
        <div className="no-appointments">
          <h3>You don't have any appointment requests from patients.</h3>
        </div>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>Age</th>
              <th>Gender</th>
              <th className="blood-group-column">Blood Group</th>
              <th>Appointment Date</th>
              <th>Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patient.patientName}</td>
                <td>{appointment.patient.email}</td>
                <td>{appointment.patient.mobileNo}</td>
                <td>{appointment.patient.age}</td>
                <td>{appointment.patient.gender}</td>
                <td className="blood-group-column">{appointment.patient.bloodGroup}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.reason}</td>
                <td className="status-actions">
                  <button
                    onClick={() => handleApprove(appointment.id)}
                    disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(appointment.id)}
                    disabled={appointment.status === "Accepted" || appointment.status === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveAppointments;
