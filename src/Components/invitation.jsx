import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

const UserInvitationPage = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [invitationList, setInvitationList] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const location = useLocation();
  const { contractId } = location.state || {};

  console.log("Contract from useLocation:", contractId);

  const apiUrl = 'http://127.0.0.1:8000/api/search/'; // Replace with your API URL

  useEffect(() => {
    console.log("Updated Search Result:", searchResult);
  }, [searchResult]); // Now logs the updated state whenever searchResult changes
  
  
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

            if (data) {
                const userData = {  // Create a new object with only the data you need
                    phoneNumber: data.phoneNumber,
                    name: data.name, // Include other fields if needed
                    // ... other fields as required
                };
        setSearchResult(userData);// Assume the first user in the list
        console.log("Search result:", searchResult);
        
    } 
    else{
      setSearchResult(null);
    }
     }   catch (err) {
      setError(err.message);
      setSearchResult(null);
    }
  };
 
  const handleAddToInvitationList = () => {
    if (!searchResult) {
        setError('Please search for a user first.');
        return;
    }

    if (!searchResult.phoneNumber) {
        setError('Invalid user data. Missing phone number.');
        console.error('Invalid user data:', searchResult);
        return;
    }

    setInvitationList((prevList) => {
        if (prevList.some((user) => user.phoneNumber === searchResult.phoneNumber)) {
            setError('User is already in the invitation list.');
            return prevList; 
        }

        const newInvitation = { 
            phoneNumber: searchResult.phoneNumber,
        };
        console.log("Adding to invitation list:", newInvitation);

        return [...prevList, newInvitation]; // Correctly updates the state
    });
};

// ✅ Use useEffect to confirm the state update:
useEffect(() => {
    console.log("Updated invitationList:", invitationList);
}, [invitationList]); // Logs new values when invitationList updates


  
  // Handle submitting the invitations
  const handleSubmitInvitations = async () => {
    try {
        setError('');

        if (invitationList.length === 0) { // Ensure the updated list is read correctly
            console.error("No users in invitation list at submit:", invitationList);
            setError('No users in the invitation list to send.');
            return;
        }

        

        
        const response = await fetch('http://127.0.0.1:8000/api/send_invitation/', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('AccessToken')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: contractId,
              members: invitationList.map((user) => user.phoneNumber),
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send invitations. Please try again.');
        }

        alert('Invitations sent successfully!');
        setInvitationList([]); // Clear after sending
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
            <p><strong>Phone:</strong> {searchResult.phoneNumber}</p>
            <p><strong>Name:</strong> {searchResult.name}</p>
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
                  <span style={{ fontWeight: '500', marginRight: '10px' }}>{user.phoneNumber}</span>
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
