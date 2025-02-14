import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phoneNumberFromState = location.state?.phoneNumber || '';

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberFromState);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!phoneNumber) {
      const storedPhoneNumber = sessionStorage.getItem('phoneNumber');
      if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    }
  }, [phoneNumber]);

  const handleProfileUpdate = async () => {
    setError('');

    if (!name || !phoneNumber || !age || !gender) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      const accessToken = sessionStorage.getItem('AccessToken');

      const response = await fetch(`http://127.0.0.1:8000/api/profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          phoneNumber,
          age,
          gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      console.log('Profile updated successfully:', data);
      navigate('/home'); // Redirect to home after profile update
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group vertical-layout">
        <label>Full Name</label>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group vertical-layout">
        <label>Phone Number</label>
        <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div className="form-group vertical-layout">
        <label>Age</label>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>
      <div className="form-group vertical-layout">
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>
      </div>
      <button onClick={handleProfileUpdate} disabled={loading}>{loading ? 'Updating...' : 'Save Profile'}</button>
    </div>
  );
};

export default UpdateProfile;