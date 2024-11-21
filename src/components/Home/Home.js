import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="unique-home" style={{
      backgroundImage: 'url("assets/img/background.png")', // Path to your background image
      backgroundSize: 'cover', // Makes the image cover the entire container
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      backgroundPosition: 'center', // Centers the image
      width: '100vw', // Full viewport width
      height: '100vh', // Full viewport height
      display: 'flex',
      flexDirection: 'column', // Stacks the content vertically
      alignItems: 'center', // Centers the content horizontally
      justifyContent: 'center', // Centers the content vertically
    }}>
      <nav className="e-doctor-nav">
        <ul>
          <li><a href="default.asp">E-Doctor</a></li>
        </ul>
      </nav>

      {/* Remaining Items Nav */}
      <nav className="main-nav">
        <ul>
          <li><a href="./">Home</a></li>
          <li><a href="#">Feedback List</a></li>
          <li><a href="./WelcomePage">Login</a></li>
          <li><a href="/registration">Registration</a></li>
        </ul>
      </nav>
      {/* <div className="circle" style={{ borderRadius: '0%', backgroundColor: 'black', padding: '10%' }}>
                    <img src="assets/img/admin.png" width="130" height="130" alt="Admin" />
                  </div> */}
                  
    </div>
    
  );
};

export default Home;
