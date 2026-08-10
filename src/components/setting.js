import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./style.css";
function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [emailNotification, setEmailNotification] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);
  const handleSave = () => {
    if (!name || !email) {
      toast.error("Please fill required fields.");
      return;
    }
    localStorage.setItem(
      "settings",
      JSON.stringify({
        name,
        email,
        phone,
        darkMode,
        emailNotification,
        pushNotification,
      }),
    );
    toast.success("Settings saved successfully!");
  };
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <div className="settings-page">
      <div className="settings-header">
        <div>
          <h1 id="settings-heading">Settings</h1>
          <p id="settings-description">
            Manage your account preferences and application settings.
          </p>
        </div>
      </div>
      <div className="profile-container">
        <h2>Profile Information</h2>
        <div className="profile-form">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="preferences-container">
        <h2>Preferences</h2>
        <div className="preference-item">
          <div>
            <h3>Dark Mode</h3>
            <p>Enable dark appearance.</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>
        <div className="preference-item">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive updates through email.</p>
          </div>
          <input
            type="checkbox"
            checked={emailNotification}
            onChange={(e) => setEmailNotification(e.target.checked)}
          />
        </div>
        <div className="preference-item">
          <div>
            <h3>Push Notifications</h3>
            <p>Receive browser notifications.</p>
          </div>
          <input
            type="checkbox"
            checked={pushNotification}
            onChange={(e) => setPushNotification(e.target.checked)}
          />
        </div>
      </div>
      <div className="save-btn-container">
        <button id="save-settings-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
export default Settings;
