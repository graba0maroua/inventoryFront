import React, { useState } from 'react';
import { useUpdatePasswordMutation } from "../../features/auth/login";

const SettingsPage: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePassword({ oldpassword: oldPassword, password: newPassword })
      .unwrap()
      .then(() => {
        // Password update success
        setIsSuccess(true);
        setIsError(false);
        setOldPassword('');
        setNewPassword('');
      })
      .catch((error) => {
        // Password update error
        setIsSuccess(false);
        setIsError(true);
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Settings</h2>
      {isSuccess && <div className="alert success">Password updated successfully!</div>}
      {isError && <div className="alert error">Password update failed. Please try again.</div>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default SettingsPage;