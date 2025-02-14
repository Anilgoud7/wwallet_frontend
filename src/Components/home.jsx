import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [tempAge, setTempAge] = useState('');
  const [tempGender, setTempGender] = useState('');

  const navigate = useNavigate();
  const BASE_URL = 'http://127.0.0.1:8000';
  
  const getTokenFromSessionStorage = () => sessionStorage.getItem('AccessToken');
  const bearerToken = getTokenFromSessionStorage();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const profileResponse = await fetch(`${BASE_URL}/api/profile/`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });
        const statsResponse = await fetch(`${BASE_URL}/api/contracts/summary/`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });

        if (!profileResponse.ok || !statsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const profileData = await profileResponse.json();
        const statsData = await statsResponse.json();
        
        setUserProfile(profileData);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    navigate('/updateprofile');
  };

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = { name: tempName, phone: tempPhone, age: tempAge, gender: tempGender };

      const response = await fetch(`${BASE_URL}/api/profile/`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${bearerToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleNavigation = (path) => navigate(path);

  if (isLoading) return <div>Loading your profile and stats...</div>;
  if (error) return <div>Error: {error}</div>;
  // Navigation handlers
  const handleAIButtonClick = () => navigate('/AI');
  const handleCreateContractClick = () => navigate('/createcontract');
  const handleContractsPage = () => navigate('/contract');
  const handleWorkFeed = () => navigate('/workfeed');
  const handlecalander = () => navigate('/attandence')

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading your profile and stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }


  return (
    <div className="home-container">
      <div className="profile-section">
        <h2>Name:{userProfile.name}</h2>
        <p>Phone: {userProfile.phoneNumber}</p>
        <p>Age: {userProfile.age}</p>
        <p>Gender: {userProfile.gender}</p>
        <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder="Name" />
            <input type="tel" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} placeholder="Phone" />
            <input type="number" value={tempAge} onChange={(e) => setTempAge(e.target.value)} placeholder="Age" />
            <select value={tempGender} onChange={(e) => setTempGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
            <button onClick={handleSaveProfile}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
{/* Stats Grid */}
<div className="action-grid">
        <div className="action-card" onClick={handleWorkFeed}>
          <h3>Find or Publish the work</h3>
         
        </div>
        <div className="action-card" onClick={handleContractsPage}>
          <h3>Contracts</h3>
          <p>View and manage your contracts.</p>
        </div>
        <div className="action-card" onClick={handleAIButtonClick}>
          <h3>Start AI Chat</h3>
          <p>Interact with our AI assistant to help you with tasks.</p>
        </div>
      </div>
    </div>
  );
};


export default Home;