import React, { useEffect, useState } from "react";
import './AppointmentsList.css'

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments from the backend
  useEffect(() => {
    fetch("http://localhost:8080/api/patient/appointments") // Adjust URL as needed
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((data) => setAppointments(data))
      .catch((error) => console.error(error.message));
  }, []);

  // Handler for cancelling appointments
  const cancelAppointment = (appointmentId) => {
    // Replace with actual API endpoint for cancelling appointments
    fetch(`http://localhost:8080/api/patient/appointments/${appointmentId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Appointment cancelled successfully.");
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
          );
        } else {
          alert("Failed to cancel appointment.");
        }
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      {appointments.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Doctor Email</th>
              <th>Appointment Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.doctorEmail}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.status || "Pending"}</td>
                <td>
                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
