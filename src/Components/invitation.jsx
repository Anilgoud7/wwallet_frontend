import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

const UserInvitationPage = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [invitationList, setInvitationList] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const location = useLocation();
  const { contractId } = location.state || {};

  console.log("Contract from useLocation:", contractId);

  const apiUrl = 'http://127.0.0.1:8000/api/search/'; // Replace with your API URL

  // Handle search by phone number
  const handleSearch = async (query) => {
    try {
      const token = sessionStorage.getItem("AccessToken");
      if (!token) {
        throw new Error("Session token not found. Please log in.");
      }

      const response = await fetch(`${apiUrl}?user=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user. Please try again.');
      }

      const data = await response.json();
      
        // Update search result to include the user's phone
        setSearchResult(data); // Assume the first user in the list
        
    } catch (err) {
      setError(err.message);
      setSearchResult(null);
    }
  };

  // Handle adding a user to the invitation list
  const handleAddToInvitationList = () => {
    if (!searchResult) {
      setError('Please search for a user first.');
      return;
    }

    // Check for duplicates using the `phone` field
    if (invitationList.some((user) => user.phone === searchResult.phone)) {
      setError('User is already in the invitation list.');
      return;
    }

    // Add the searched user to the invitation list
    setInvitationList([...invitationList, searchResult]);
    setSearchResult(null); // Clear search result after adding
  };

  // Handle submitting the invitations
  const handleSubmitInvitations = async () => {
    try {
      setError('');
      const token = sessionStorage.getItem('AccessToken');
      if (!invitationList.length) {
        setError('No users in the invitation list to send.');
        return;
      }
      const requestBody = {
        id: contractId,
        members: invitationList.map((user) => user.phone),
      };
      console.log("Sending Request Body:", requestBody);

      const response = await fetch('http://127.0.0.1:8000/api/send_invitation/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send invitations. Please try again.');
      }

      alert('Invitations sent successfully!');
      setInvitationList([]); // Clear the invitation list after submission
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Send User Invitations</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="input"
          placeholder="Enter phone number..."
          value={userQuery}
          onChange={(e) => {
            setUserQuery(e.target.value);
          }}
          style={{ padding: '10px', width: '300px', fontSize: '16px', marginRight: '10px' }}
        />
        <button
          onClick={() => handleSearch(userQuery)}
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
        >
          Search
        </button>
      </div>

      {/* Search Result */}
      {searchResult && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Search Result</h3>
          <div style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
            <p><strong>Phone:</strong> {searchResult.phone}</p>
            <button
              onClick={handleAddToInvitationList}
              style={{
                padding: '5px 10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Add to Invitation List
            </button>
          </div>
        </div>
      )}

      {/* Invitation List */}
      <div style={{ marginBottom: '20px' }}>
        {invitationList.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {invitationList.map((user, index) => (
              <li
                key={index}
                style={{
                  borderBottom: '1px solid #ddd',
                  padding: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f9f9f9',
                  marginBottom: '5px',
                  borderRadius: '4px',
                }}
              >
                <div>
                  <span style={{ fontWeight: '500', marginRight: '10px' }}>{user.phone}</span>
                </div>
                <button
                  onClick={() => {
                    const updatedList = invitationList.filter((u) => u.phone !== user.phone);
                    setInvitationList(updatedList);
                  }}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users in the invitation list.</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitInvitations}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Send Invitations
      </button>
    </div>
  );
};

export default UserInvitationPage;
