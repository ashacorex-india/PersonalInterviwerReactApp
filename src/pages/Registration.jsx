import React, { useState } from 'react'
import '../styles/Registration.css'
import { useNavigate } from 'react-router-dom';
// name, email, mobile number, dob, gender, qualification, passing year, skills, college name, university.
const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [qualification, setQualification] = useState("");
  const [passingYear, setPassingYear] = useState("");
  const [skills, setSkills] = useState("");

  const [collegeName, setCollegeName] = useState("");
  const [university, setUniversity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
        basicDetails: {
          name,
          email,
          password,
          mobile,
          dob,
          gender
        },

        educationDetails: {
          qualification,
          passingYear,
          skills
        },

        collegeDetails: {
          collegeName,
          university
        }
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successfull");
    navigate("/");
  }

  return (
    <div className='registration-container'>
      {/* left side */}
      <div className='registration-left'>
        <div className='left-content'>
          <h1>Welcome to Personal Interviwer</h1>
          <p>Register yourself and take your first step towards your IT Careet</p>
        </div>
      </div>

      {/* Right side */}
      <div className='registration-right'>
          <form onSubmit={handleSubmit}>
            <h2>Student Registration</h2>
            <p>Please fill your details</p>

            <h3>1. Basic Details</h3>
            <div className='form-group'>
                <label>Full Name</label>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Enter your full name'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email address'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Mobile Number</label>
                <input
                  type='tel'
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder='Enter your mobile number'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Date of birth</label>
                <input
                  type='date'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
            </div>

            <div className='form-group'>
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
            </div>

            <h3>2.Educational Details</h3>
            <div className='form-group'>
                <label>Highest Qualification</label>
                <select value={qualification} onChange={(e) => setQualification(e.target.value)} required>
                  <option value="">Select Qualification</option>
                  <option value="BCA">BCA</option>
                  <option value="BSC Computer Science">BSC Computer Science</option>
                  <option value="BTech">BTech</option>
                  <option value="MCA">MCA</option>
                  <option value="MSc">MSc</option>
                  <option value="MTech">Mtech</option>
                  <option value="Other">Other</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Passing Year</label>
                <input
                  type='number'
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  placeholder='Enter passing year'
                  required
                />
            </div>

            <div className='form-group'>
                <label>Technical Skills</label>
                <textarea 
                  value={skills} 
                  onChange={(e) => setSkills(e.target.value)} 
                  placeholder='Java, React, SQL....'
                  required
                  />
            </div>

            <h3>3.College Details</h3>
            <div className='form-group'>
                <label>College Name</label>
                <input
                  type='text'
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder='Enter college name'
                  required
                />
            </div>

            <div className='form-group'>
                <label>University</label>
                <input
                  type='text'
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder='Enter university name'
                  required
                />
            </div>

            <button type='submit'>
              Register Now
            </button>
          </form>
      </div>
    </div>
  )
}

export default Registration