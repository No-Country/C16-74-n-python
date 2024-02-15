import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [nick_name, setNickName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    client.get("/user/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function updateFormBtn() {
    setRegistrationToggle(prevToggle => !prevToggle);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (registrationToggle) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      client.post("/user/register", {  email, password, first_name, last_name, nick_name, phone_number, address, role })
        .then(res => {
          client.post("/user/login", { email, password })
            .then(res => setCurrentUser(true))
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    } else {
      client.post("/user/login", { email, password })
        .then(res => setCurrentUser(true))
        .catch(err => console.error(err));
    }
  }

  function handleLogout(e) {
    e.preventDefault();
    client.post("/user/logout")
      .then(res => setCurrentUser(false))
      .catch(err => console.error(err));
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Authentication App</span>
          {currentUser ? (
            <form onSubmit={handleLogout}>
              <button type="submit" className="btn btn-light">Log out</button>
            </form>
          ) : (
            <button type="button" onClick={updateFormBtn} className="btn btn-light">
              {registrationToggle ? "Register" : "Log in"}
            </button>
          )}
        </div>
      </nav>
      <div className="container">
        {currentUser ? (
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        ) : (
          <div className="center">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {registrationToggle && (
                <>
                 {/*  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div> */}
                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" placeholder="Enter your first name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" placeholder="Enter your last name" value={last_name} onChange={e => setLastName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nick_name" className="form-label">Nick Name</label>
                    <input type="text" className="form-control" id="nick_name" placeholder="Enter your nick name" value={nick_name} onChange={e => setNickName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phone_number" placeholder="Enter your phone number" value={phone_number} onChange={e => setPhoneNumber(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter your address" value={address} onChange={e => setAddress(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-control" id="role" value={role} onChange={e => setRole(e.target.value)}>
                    {['user', 'professional'].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    </select>
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
