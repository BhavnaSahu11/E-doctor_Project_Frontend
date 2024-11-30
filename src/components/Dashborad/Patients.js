
import React from 'react';
import "./Patient.css";

const Patients = () => {
  // Sample data for demonstration purposes
  const patientsData = [

  ];

  return (
    <div className='Patients-container'>
     
      <button className="patient-btn">Add Patient</button>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>PatientName</th>
            <th>Mobile No</th>
     <th>Blood Group</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {patientsData.map((patient) => (
            <tr key={patient.patientId}>
          <td>{patient.patientName}</td>
              <td>{patient.mobileNo}</td>
               <td>{patient.bloodGroup}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
