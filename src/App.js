import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import UserLogin from './components/Login/UserLogin';  // Import UserLogin component
import DoctorLogin from './components/Login/DoctorLogin';
import AdminLogin from './components/Login/AdminLogin';
import ForgotPassword from './components/Login/ForgotPassword';
import DoctorDashboard from './components/Dashborad/DoctorDashboard/DoctorDashboard';
import EditProfile from './components/Dashborad/EditDoctorProfile/EditProfile';
import YourSchedule from './components/Dashborad/UpdateAvialblity/YourSchedule';
import PatientDashboard from './components/UserDashboard/PatientDashboard/PatientDashboard';
import PaymentSuccess from './components/UserDashboard/PaymentSuccess';

import FeedbackListHomePage from './components/UserDashboard/FeedbackList/FeedbackListHomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />  {/* WelcomePage route */}
        
        {/* User-specific login */}
        <Route path="/user-login" element={<UserLogin />} />  {/* User Login route */}
        
        {/* Admin login */}
        <Route path="/admin-login" element={<AdminLogin />} />  {/* Admin Login route */}
        
        {/* Doctor login */}
        <Route path="/doctor-login" element={<DoctorLogin />} />  {/* Doctor Login route */}
        
        <Route path="/registration" element={<Registration />} />  {/* Registration route */}

        <Route path="/forgot-password" element={<ForgotPassword />}/>

        <Route path="/doctor-dashboard" element={<DoctorDashboard />}/>

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/yourSchedule" element={<YourSchedule />} />

        <Route path="/user-dashboard" element={<PatientDashboard />}/>

     
        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="/feedback-list" element={<FeedbackListHomePage />} /> 


      </Routes>
    </BrowserRouter>
  );
}

export default App;
