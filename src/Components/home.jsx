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
  const BASE_URL = 'http://127.0.0.1:8000'; // Add this base URL constant

  const getTokenFromsessionStorage = () => {
    const token = sessionStorage.getItem('AccessToken'); 
    return token;
  };
  
  // Example usage:
  const bearerToken = getTokenFromsessionStorage(); 

  // Fetch user profile and stats from the backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const profileResponse = await fetch(`${BASE_URL}/api/profile/`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });
        const statsResponse = await fetch(`${BASE_URL}/api/contracts/summary/`, {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        });

        if (!profileResponse.ok) {
          throw new Error(`Profile fetch failed: ${profileResponse.status}`);
        }
        if (!statsResponse.ok) {
          throw new Error(`Stats fetch failed: ${statsResponse.status}`);
        }

        const profileData = await profileResponse.json();
        const statsData = await statsResponse.json();

        setUserProfile(profileData);
        setStats(statsData);

        // Set temporary fields for editing
        setTempName(profileData.name);
        setTempPhone(profileData.phone);
        setTempAge(profileData.age);
        setTempGender(profileData.gender);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  // Handle profile update
  const handleSaveProfile = async () => {
    try {
      const updatedProfile = {
        name: tempName,
        phone: tempPhone,
        age: tempAge,
        gender: tempGender,
      };

      const response = await fetch(`${BASE_URL}/api/profile/`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Navigation handlers
  const handleAIButtonClick = () => navigate('/AI');
  const handleCreateContractClick = () => navigate('/createcontract');
  const handleContractListClick = () => navigate('/contract-list');
  const handleContractCreateListClick = () => navigate('/contractcreated-list');
  const handleInvitationListClick = () => navigate('/contract-invitation');
  const handleContractReceivedListClick = () => navigate('/contractreceived-list');

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

  if (!userProfile || !stats) {
    return (
      <div className="error-container">
        <p>No data available. Please try again later.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-info">
          <h2>
            {isEditing ? (
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="edit-input"
              />
            ) : (
              userProfile.name
            )}
          </h2>
          <p>
            {isEditing ? (
              <input
                type="tel"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="edit-input"
              />
            ) : (
              userProfile.phone
            )}
          </p>
          <p>
            {isEditing ? (
              <input
                type="number"
                value={tempAge}
                onChange={(e) => setTempAge(e.target.value)}
                className="edit-input"
              />
            ) : (
              userProfile.age
            )}
          </p>
          <p>
            {isEditing ? (
              <select
                value={tempGender}
                onChange={(e) => setTempGender(e.target.value)}
                className="edit-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              userProfile.gender
            )}
          </p>
          <button 
            className="edit-button" 
            onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="action-grid">
        <div className="action-card" onClick={handleContractListClick}>
          <h3>Total Contracts</h3>
          <p className="stat-number">{stats.total_contracts}</p>
        </div>
        <div className="action-card" onClick={handleContractCreateListClick}>
          <h3>Contracts Created</h3>
          <p className="stat-number">{stats.contracts_as_provider}</p>
        </div>
        <div className="action-card" onClick={handleContractReceivedListClick}>
          <h3>Contracts Received</h3>
          <p className="stat-number">{stats.contracts_as_member}</p>
        </div>
        <div className="stat-card">
          <h3>Total Days Worked</h3>
          <p className="stat-number">{stats.total_days_worked}</p>
        </div>
        <div className="stat-card">
          <h3>Total Amount Earned</h3>
          <p className="stat-number">₹{stats.total_amount_earned}</p>
        </div>
        <div className="action-card" onClick={handleInvitationListClick}>
          <h3>Invitations</h3>
          <p className="stat-number">{stats.pending_invitations}</p>
        </div>
        <div className="action-card" onClick={handleAIButtonClick}>
          <h3>Start AI Chat</h3>
          <p>Interact with our AI assistant to help you with tasks.</p>
        </div>
        <div className="action-card" onClick={handleCreateContractClick}>
          <h3>Create Contract</h3>
          <p>Start creating a new contract for your needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;