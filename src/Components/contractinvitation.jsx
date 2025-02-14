import React, { useState, useEffect } from 'react';

const ContractInvitationList = () => {
  const [invitations, setInvitations] = useState([]);
  const [filteredInvitations, setFilteredInvitations] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const apiUrl = 'http://127.0.0.1:8000/api/send_invitation/';

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setError('');
        const token = sessionStorage.getItem('AccessToken');

        if (!token) {
          throw new Error('Session token not found. Please log in.');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch invitations. Please try again.');
        }

        const data = await response.json();
        setInvitations(data);
        console.log('data',data);
        setFilteredInvitations(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInvitations();
  }, [apiUrl]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = invitations.filter((invitation) =>
      invitation.id.toString().includes(value) ||
      invitation.contract.toString().includes(value) ||
      invitation.status.toLowerCase().includes(value)
    );
    setFilteredInvitations(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatMembers = (members) => {
    return members.join(', ');
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
    };

    switch (status.toLowerCase()) {
      case 'accepted':
        return {
          ...baseStyle,
          backgroundColor: '#e6ffe6',
          color: '#006600',
        };
      case 'pending':
        return {
          ...baseStyle,
          backgroundColor: '#fff3e6',
          color: '#cc7700',
        };
      default:
        return baseStyle;
    }
  };

  const handleResponse = async (id, response) => {
    try {
      const token = sessionStorage.getItem('AccessToken');
      const responseApiUrl = `http://127.0.0.1:8000/api/invitationresponse/`;

      const res = await fetch(responseApiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id:id,
          action:response }),
      });

      if (!res.ok) {
        throw new Error('Failed to update invitation status. Please try again.');
      }

      // Update invitation list after response
      const updatedInvitations = invitations.map((invitation) =>
        invitation.id === id ? { ...invitation, status: response } : invitation
      );

      setInvitations(updatedInvitations);
      setFilteredInvitations(updatedInvitations);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contract Invitations</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Search invitations..."
        value={search}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
        }}
      />

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Contract ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Work Provider</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Members</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvitations.length > 0 ? (
            filteredInvitations.map((invitation) => (
              <tr key={invitation.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{invitation.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{invitation.contract}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{invitation.work_provider}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatMembers(invitation.members)}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {invitation.status.toLowerCase() === 'pending' ? (
                    <div>
                      <button
                        onClick={() => handleResponse(invitation.id, 'accept')}
                        style={{
                          marginRight: '10px',
                          padding: '5px 10px',
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleResponse(invitation.id, 'reject')}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={getStatusStyle(invitation.status)}>{invitation.status}</span>
                  )}
                
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                No invitations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContractInvitationList;
