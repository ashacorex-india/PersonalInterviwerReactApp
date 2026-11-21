import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    alert("Logout Successfull");
    navigate("/login");
  }
  return (
    <nav className='navbar'>

      {/* logo */}
      <div className='navbar-logo' onClick={(e) => navigate("/")}>
        <div className='logo-icon'>
          <span>AI</span>
        </div>

        <span className='logo-text'>
          Interview<span>Pro</span>
        </span>
      </div>

      {/* navigation tabs */}
      <div className='navbar-links'>
        <NavLink 
          to="/" 
          className={({isActive}) =>
            `nav-link ${isActive ? "active": ""}`
        }
        >
          Home
        </NavLink>

        <NavLink to="/past-interviews" className={({isActive}) =>
          `nav-link ${isActive ? "active": ""}`
          }
        >
          Past Interviews
        </NavLink>

        <NavLink to="/about" className={({isActive}) => 
          `nav-link ${isActive ? "active": ""}`
        }
        >
          About
        </NavLink>

        <NavLink to="/contact" className={({isActive}) => 
          `nav-link ${isActive ? "active": ""}`
        }
        >
          Contact Us
        </NavLink>
      </div>

      {/* logout button */}
      <div className='navbar-actions'>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar