import React from 'react'
import '../styles/Home.css';
import MainForm from '../components/MainForm';

const Home = () => {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;

  if (!userObj) {
    return (
      <div className='home-container'>
        <h2>No user details found</h2>
      </div>
    )
  }

  const { basicDetails, collegeDetails, educationDetails } = userObj;


  return (
    <div className='home-container'>
      {/* Welcome Header */}
      <div className='welcome-header'>
        <div>
          <h1>Welcome, {basicDetails.name}</h1>
          <p>Here is your profile for the interview</p>
        </div>

        <div className='profile-avtar'>
          {basicDetails?.name?.charAt(0).toUpperCase()}
        </div>
      </div>


      {/* Card Details */}
      <div className='profile-cards'>
        {/* Basic Details */}
        <div className='profile-card'>
          <div className='card-header'>
            <h2>Basic Details</h2>
          </div>

          <div className='card-content'>
            <div className='detail-item'>
              <span>Name:</span>
              <strong>{basicDetails?.name || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Email:</span>
              <strong>{basicDetails?.email || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Date of birth:</span>
              <strong>{basicDetails?.dob || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Mobile:</span>
              <strong>{basicDetails?.mobile || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Gender:</span>
              <strong>{basicDetails?.gender || "N/A"}</strong>
            </div>
          </div>
        </div>

        {/* Educational Details */}
        <div className='profile-card'>
          <div className='card-header'>
            <h2>Educational Details</h2>
          </div>

          <div className='card-content'>
            <div className='detail-item'>
              <span>Skills:</span>
              <strong>{educationDetails?.skills || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Qualification:</span>
              <strong>{educationDetails?.qualification || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>Passing Year:</span>
              <strong>{educationDetails?.passingYear || "N/A"}</strong>
            </div>
          </div>
        </div>

        {/* <College Details  */}
        <div className='profile-card'>
          <div className='card-header'>
            <h2>College Details</h2>
          </div>

          <div className='card-content'>
            <div className='detail-item'>
              <span>College Name:</span>
              <strong>{collegeDetails?.collegeName || "N/A"}</strong>
            </div>

            <div className='detail-item'>
              <span>University:</span>
              <strong>{collegeDetails?.university || "N/A"}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Form Container */}
      <MainForm obj = {userObj}/>
    </div>
  )
}

export default Home