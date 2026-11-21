import React from 'react'
import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-brand'>
          <h2>Interview Pro</h2>
          <p>Lorem</p>
        </div>

        <div className='footer-section'>
          <h3>Get in touch</h3>
          <p>Email: support@interviewpro.com</p>
          <p>lorem</p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>
          {new Date().getFullYear} InterviewPro.
          All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer