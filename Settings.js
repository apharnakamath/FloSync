import React, { useState } from 'react';
import Card, { CardHeader, CardContent } from 'src/components/ui/card';
import Button from 'src/components/ui/button';
import { Lock, LogOut, ChevronRight, Heart, AlertTriangle, Flower, MessageCircle } from 'lucide-react';
import axios from 'axios'; // Import axios to make the API call
import './styles.css';

export const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Manage login state
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [oldPassword, setOldPassword] = useState(""); // Manage old password input
  const [newPassword, setNewPassword] = useState(""); // Manage new password input
  const [passwordError, setPasswordError] = useState(""); // Store error messages
  const [passwordSuccess, setPasswordSuccess] = useState(""); // Store success message

  const infoCategories = [
    {
      title: "Period Health",
      icon: Heart,
      description: "Learn about menstrual health and cycle patterns",
      color: "red",
      link: "https://search.app?link=https%3A%2F%2Fwww.mayoclinic.org%2Fhealthy-lifestyle%2Fwomens-health%2Fin-depth%2Fmenstrual-cycle%2Fart-20047186&utm_campaign=aga&utm_source=agsadl1%2Csh%2Fx%2Fgs%2Fm2%2F4"
    },
    {
      title: "PCOS/PCOD",
      icon: AlertTriangle,
      description: "Information about common reproductive health conditions",
      color: "yellow",
      link: "https://search.app?link=https%3A%2F%2Fwww.pacehospital.com%2Fpcod-polycystic-ovary-disease-cause-symptoms-and-treatment&utm_campaign=aga&utm_source=agsadl1%2Csh%2Fx%2Fgs%2Fm2%2F4"
    },
    {
      title: "Sexual Health",
      icon: Flower,
      description: "Important information about sexual and reproductive health",
      color: "pink",
      link: "https://search.app?link=https%3A%2F%2Fwww.ashasexualhealth.org%2Fsexual-health%2F&utm_campaign=aga&utm_source=agsadl1%2Csh%2Fx%2Fgs%2Fm2%2F4"
    },
    {
      title: "Common Misconceptions",
      icon: MessageCircle,
      description: "Debunking myths about menstrual health",
      color: "purple",
      link: "https://search.app?link=https%3A%2F%2Fwww.unicef.org%2Frosa%2Fstories%2F7-alarming-myths-about-periods-we-have-end-now&utm_campaign=aga&utm_source=agsadl1%2Csh%2Fx%2Fgs%2Fm2%2F4"
    }
  ];

  const handleLogout = () => {
    setIsLoggedIn(false); // Logout logic
    console.log("Logged out successfully");
  };

  const handleChangePassword = () => {
    setIsModalOpen(true); // Open the change password modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Clear any previous messages
    setPasswordError("");
    setPasswordSuccess("");

    try {
      // Make API call to change password
      const response = await axios.post("/api/change-password", {
        oldPassword,
        newPassword,
      });

      // Check response from backend
      if (response.data.success) {
        setPasswordSuccess("Password changed successfully!");
        setOldPassword(""); // Clear form
        setNewPassword("");
        setIsModalOpen(false); // Close modal after success
      } else {
        setPasswordError(response.data.message); // Show error message from backend
      }
    } catch (error) {
      // Handle error (e.g., network error)
      setPasswordError("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="settings-container">
      {isLoggedIn ? (
        <>
          {/* Account Settings */}
          <Card>
            <CardHeader>
              <h2 className="section-title">Account Settings</h2>
            </CardHeader>
            <CardContent className="account-settings">
              <Button
                variant="outline"
                className="button-style"
                onClick={handleChangePassword}
              >
                <div className="button-content">
                  <Lock className="icon" />
                  Change Password
                </div>
                <ChevronRight className="icon-right" />
              </Button>
              <Button
                variant="outline"
                className="button-style logout-button"
                onClick={handleLogout}
              >
                <div className="button-content">
                  <LogOut className="icon" />
                  Logout
                </div>
                <ChevronRight className="icon-right" />
              </Button>
            </CardContent>
          </Card>

          {/* Health Information Categories */}
          <Card>
            <CardHeader>
              <h2 className="section-title">Health Information</h2>
            </CardHeader>
            <CardContent className="health-info">
              {infoCategories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="button-style category-button"
                  onClick={() => window.open(category.link, '_blank')}
                >
                  <div className="category-content">
                    <category.icon className={`icon ${category.color}-icon`} />
                    <div className="text-content">
                      <h3 className="category-title">{category.title}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="icon-right" />
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Change Password Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  {passwordError && <div className="error-message">{passwordError}</div>}
                  {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                  <div className="modal-actions">
                    <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" type="submit">Change Password</Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="logout-message">
          <h3>You have been logged out. Please log in again to access settings.</h3>
        </div>
      )}
    </div>
  );
};

