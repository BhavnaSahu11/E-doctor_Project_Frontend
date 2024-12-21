// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";


// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   // Function to fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Function to fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//   }, []);

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {[
//             "Dashboard",
//             "Edit Profile",
//             "My Appointments",
//             "Prescriptions",
//             "Doctors List",
//             "Health Records",
//             "Settings",
//           ].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

      
//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}


//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}


//           {/* If menu is not Dashboard, Edit Profile, Appointments or Doctor List */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" && 
//             selectedMenu !== "Doctors List" &&(
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";

// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   // Fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch unread notifications
//   const fetchNotifications = () => {
//     axios
//       .get(`http://localhost:8080/api/notifications/${userEmail}`)
//       .then((response) => {
//         setNotifications(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching notifications:", error);
//       });
//   };

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/api/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//     fetchNotifications();
//   }, []);

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {[
//             "Dashboard",
//             "Edit Profile",
//             "My Appointments",
//             "Prescriptions",
//             "Doctors List",
//             "Health Records",
//             "Settings",
//           ].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               {/* Notification Bell Icon */}
//               <div className="notification-container">
//                 <button 
//                   className="notification-bell" 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">
//                       {notifications.length}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           <button onClick={() => markAsRead(notification.id)}>
//                             Mark as Read
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}

//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}

//           {/* Fallback Content */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" &&
//             selectedMenu !== "Doctors List" && (
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";

// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   // Fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch unread notifications
//   const fetchNotifications = () => {
//     if (userEmail) {
//       axios
//         .get(`http://localhost:8080/api/notifications/${userEmail}`)
//         .then((response) => {
//           setNotifications(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   };

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/api/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//   }, []);

//   // Fetch notifications after email is available
//   useEffect(() => {
//     if (userEmail) {
//       fetchNotifications();
//     }
//   }, [userEmail]);

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {["Dashboard", "Edit Profile", "My Appointments", "Prescriptions", "Doctors List", "Health Records", "Settings"].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               {/* Notification Bell Icon */}
//               <div className="notification-container">
//                 <button 
//                   className="notification-bell" 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">
//                       {notifications.length}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           <button onClick={() => markAsRead(notification.id)}>
//                             Mark as Read
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}

//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}

//           {/* Fallback Content */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" &&
//             selectedMenu !== "Doctors List" && (
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";

// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   // Fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch unread notifications
//   const fetchNotifications = useCallback(() => {
//     if (userEmail) {
//       axios
//         .get(`http://localhost:8080/api/notifications/${userEmail}`)
//         .then((response) => {
//           setNotifications(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   }, [userEmail]); // Only re-run this effect when userEmail changes

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/api/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//   }, []); // Only run once when the component mounts

//   // Fetch notifications after email is available
//   useEffect(() => {
//     if (userEmail) {
//       fetchNotifications();
//     }
//   }, [userEmail, fetchNotifications]); // Fetch notifications whenever userEmail or fetchNotifications changes

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {["Dashboard", "Edit Profile", "My Appointments", "Prescriptions", "Doctors List", "Health Records", "Settings"].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               {/* Notification Bell Icon */}
//               <div className="notification-container">
//                 <button 
//                   className="notification-bell" 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">
//                       {notifications.length}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           <button onClick={() => markAsRead(notification.id)}>
//                             Mark as Read
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}

//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}

//           {/* Fallback Content */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" &&
//             selectedMenu !== "Doctors List" && (
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";

// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   // Fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch unread notifications
//   const fetchNotifications = useCallback(() => {
//     if (userEmail) {
//       axios
//         .get(`http://localhost:8080/api/notifications/${userEmail}`)
//         .then((response) => {
//           setNotifications(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   }, [userEmail]); // Only re-run this effect when userEmail changes

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/api/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//   }, []); // Only run once when the component mounts

//   // Fetch notifications after email is available
//   useEffect(() => {
//     if (userEmail) {
//       fetchNotifications();
//     }
//   }, [userEmail, fetchNotifications]); // Fetch notifications whenever userEmail or fetchNotifications changes

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {["Dashboard", "Edit Profile", "My Appointments", "Prescriptions", "Doctors List", "Health Records", "Settings"].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               {/* Notification Bell Icon */}
//               <div className="notification-container">
//                 <button 
//                   className="notification-bell" 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">
//                       {notifications.length}
//                     </span>
//                   )}
//                 </button>
//                 {/* {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           <button onClick={() => markAsRead(notification.id)}>
//                             Mark as Read
//                           </button>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )} */}
// {showNotifications && (
//   <div className="notification-dropdown">
//     {notifications.length > 0 ? (
//       notifications.map((notification) => (
//         <div key={notification.id} className="notification-item">
//           <p>{notification.message}</p>
//           {/* Show a button for marking notifications as read */}
//           {notification.status !== "READ" && (
//             <button onClick={() => markAsRead(notification.id)}>
//               Mark as Read
//             </button>
//           )}
//         </div>
//       ))
//     ) : (
//       <p>No notifications available</p>  
//     )}
//   </div>
// )}


//               </div>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}

//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}

//           {/* Fallback Content */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" &&
//             selectedMenu !== "Doctors List" && (
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import SockJS from "sockjs-client";
// import {Stomp} from "@stomp/stompjs";
// import "./PatientDashboard.css";
// import EditPatientProfile from "../EditProfile/EditPatientProfile";
// import AppointmentsList from '../Appointment/AppointmentsList';
// import DoctorList from "../DoctorList/DoctorList";

// const PatientDashboard = () => {
//   const [selectedMenu, setSelectedMenu] = useState("Dashboard");
//   const [userEmail, setUserEmail] = useState("");
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     patientName: "",
//     mobileNo: "",
//     bloodGroup: "",
//     gender: "",
//     age: "",
//     address: "",
//   });

//   const socketUrl = "http://localhost:8080/ws"; // Your WebSocket endpoint URL

//   // Fetch user's email
//   const fetchUserEmail = () => {
//     axios
//       .get("http://localhost:8080/api/patient/get-welcome-email")
//       .then((response) => {
//         setUserEmail(response.data.email || "Unknown Email");
//       })
//       .catch((error) => {
//         console.error("Error fetching email:", error);
//         setUserEmail("Error fetching email");
//       });
//   };

//   // Fetch user's profile
//   const fetchUserProfile = () => {
//     axios
//       .get("http://localhost:8080/api/patient/profile")
//       .then((response) => {
//         setUserProfile(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching profile:", error);
//       });
//   };

//   // Fetch unread notifications
//   const fetchNotifications = useCallback(() => {
//     if (userEmail) {
//       axios
//         .get(`http://localhost:8080/notifications/${userEmail}`)
//         .then((response) => {
//           setNotifications(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching notifications:", error);
//         });
//     }
//   }, [userEmail]);

//   // Mark notification as read
//   const markAsRead = (id) => {
//     axios
//       .post(`http://localhost:8080/notifications/read/${id}`)
//       .then(() => {
//         setNotifications(notifications.filter((n) => n.id !== id));
//       })
//       .catch((error) => console.error("Error marking notification as read:", error));
//   };

//   // WebSocket for real-time notifications
//   useEffect(() => {
//     if (userEmail) {
//       const socket = new SockJS(socketUrl);
//       const stompClient = Stomp.over(socket);

//       stompClient.connect({}, () => {
//         stompClient.subscribe(`/topic/notifications/${userEmail}`, (message) => {
//           const newNotification = JSON.parse(message.body);
//           setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
//         });
//       });

//       return () => {
//         if (stompClient) {
//           stompClient.disconnect();
//         }
//       };
//     }
//   }, [userEmail]); // Re-establish WebSocket connection when userEmail changes

//   // Fetch data on component load
//   useEffect(() => {
//     fetchUserEmail();
//     fetchUserProfile();
//   }, []); // Only run once when the component mounts

//   // Fetch notifications after email is available
//   useEffect(() => {
//     if (userEmail) {
//       fetchNotifications();
//     }
//   }, [userEmail, fetchNotifications]); // Fetch notifications whenever userEmail or fetchNotifications changes

//   const handleMenuClick = (menu) => {
//     setSelectedMenu(menu);
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-section">
//           <img
//             src="assets/img/maleuser.png"
//             alt="User"
//             className="profile-picture"
//           />
//           <p className="user-name">
//             {userProfile.patientName || "Loading Name..."}
//           </p>
//         </div>
//         <ul className="menu-list">
//           {["Dashboard", "Edit Profile", "My Appointments", "Prescriptions", "Doctors List", "Health Records", "Settings"].map((menu) => (
//             <li
//               key={menu}
//               className={selectedMenu === menu ? "menu-item active" : "menu-item"}
//               onClick={() => handleMenuClick(menu)}
//             >
//               {menu}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <div className="User-navbar">
//           <ul>
//             <li>
//               <a href="/user-dashboard">Home</a>
//             </li>
//             <li>
//               <span>Welcome {userEmail || "Loading..."}</span>
//             </li>
//             <li>
//               {/* Notification Bell Icon */}
//               <div className="notification-container">
//                 <button 
//                   className="notification-bell" 
//                   onClick={() => setShowNotifications(!showNotifications)}
//                 >
//                   🔔
//                   {notifications.length > 0 && (
//                     <span className="notification-badge">
//                       {notifications.length}
//                     </span>
//                   )}
//                 </button>
//                 {showNotifications && (
//                   <div className="notification-dropdown">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div key={notification.id} className="notification-item">
//                           <p>{notification.message}</p>
//                           {/* Show a button for marking notifications as read */}
//                           {notification.status !== "READ" && (
//                             <button onClick={() => markAsRead(notification.id)}>
//                               Mark as Read
//                             </button>
//                           )}
//                         </div>
//                       ))
//                     ) : (
//                       <p>No new notifications</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li>
//               <a href="/WelcomePage">Logout</a>
//             </li>
//           </ul>
//         </div>

//         {/* Content */}
//         <div className="cards-container">
//           {selectedMenu === "Dashboard" && (
//             <>
//               <div className="card">
//                 <h2>Upcoming Appointments</h2>
//                 <p>2</p>
//               </div>
//               <div className="card">
//                 <h2>Health Records</h2>
//                 <p>5 records</p>
//               </div>
//               <div className="card">
//                 <h2>Prescriptions</h2>
//                 <p>8 prescriptions</p>
//               </div>
//             </>
//           )}

//           {selectedMenu === "Edit Profile" && (
//             <EditPatientProfile
//               refreshData={() => {
//                 fetchUserEmail();
//                 fetchUserProfile();
//               }}
//             />
//           )}

//           {selectedMenu === "Doctors List" && <DoctorList />} {/* Render Doctor List */}

//           {selectedMenu === "My Appointments" && <AppointmentsList />} {/* Render Appointments List */}

//           {/* Fallback Content */}
//           {selectedMenu !== "Dashboard" &&
//             selectedMenu !== "Edit Profile" &&
//             selectedMenu !== "My Appointments" &&
//             selectedMenu !== "Doctors List" && (
//               <div className="dynamic-content">
//                 <p>
//                   Showing details for: <strong>{selectedMenu}</strong>
//                 </p>
//               </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDashboard;
//till right notify
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import "./PatientDashboard.css";
import EditPatientProfile from "../EditProfile/EditPatientProfile";
import AppointmentsList from "../Appointment/AppointmentsList";
import DoctorList from "../DoctorList/DoctorList";
import Feedback from "../FeedbackList/Feedback";

//import FeedbackForm from "../Feedback/FeedbackForm"; // Import Feedback Form component

const PatientDashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState({
    patientName: "",
    mobileNo: "",
    bloodGroup: "",
    gender: "",
    age: "",
    address: "",
  });

  const socketUrl = "http://localhost:8080/ws"; // WebSocket endpoint

  // Fetch user's email
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

  // Fetch user's profile
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

  // Fetch unread notifications
  const fetchNotifications = useCallback(() => {
    if (userEmail) {
      axios
        .get(`http://localhost:8080/notifications/${userEmail}`)
        .then((response) => {
          setNotifications(response.data);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [userEmail]);

  // Mark notification as read
  const markAsRead = (id) => {
    axios
      .post(`http://localhost:8080/notifications/read/${id}`)
      .then(() => {
        setNotifications(notifications.filter((n) => n.id !== id));
      })
      .catch((error) =>
        console.error("Error marking notification as read:", error)
      );
  };

  // WebSocket for real-time notifications
  useEffect(() => {
    if (userEmail) {
      const socket = new SockJS(socketUrl);
      const stompClient = Stomp.over(socket);

      stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/notifications/${userEmail}`, (message) => {
          const newNotification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [
            newNotification,
            ...prevNotifications,
          ]);
        });
      });

      return () => {
        if (stompClient) {
          stompClient.disconnect();
        }
      };
    }
  }, [userEmail]);

  // Fetch data on component load
  useEffect(() => {
    fetchUserEmail();
    fetchUserProfile();
  }, []);

  // Fetch notifications after email is available
  useEffect(() => {
    if (userEmail) {
      fetchNotifications();
    }
  }, [userEmail, fetchNotifications]);

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
            "Feedback", // Add Feedback Menu
          ].map((menu) => (
            <li
              key={menu}
              className={
                selectedMenu === menu ? "menu-item active" : "menu-item"
              }
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
              <div className="notification-container">
                <button
                  className="notification-bell"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  🔔
                  {notifications.length > 0 && (
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="notification-dropdown">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <p>{notification.message}</p>
                          {notification.status !== "READ" && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>No new notifications</p>
                    )}
                  </div>
                )}
              </div>
            </li>
            <li>
              <a href="/WelcomePage">Logout</a>
            </li>
          </ul>
        </div>

        {/* Render based on selected menu */}
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

          {selectedMenu === "Doctors List" && <DoctorList />}

          {selectedMenu === "My Appointments" && <AppointmentsList />}
{/* 
        {selectedMenu === "Feedback" && <Feedback/>} Add Feedback */}

{selectedMenu === "Feedback" && <Feedback/>}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

