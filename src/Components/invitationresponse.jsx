import React, { useState } from 'react';

const InvitationResponseCard = ({ invitation, onAccept, onReject }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAcceptClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const bearerToken = localStorage.getItem('token');

      const response = await fetch(`http://127.0.0.1:8000/api/invitationresponse/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: invitation.id,
          action: 'accept'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to accept invitation');
      }

      onAccept(invitation.id);
    } catch (err) {
      setError('Failed to accept invitation. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectClick = async () => {
    try {
      setLoading(true);
      setError(null);
      const bearerToken = localStorage.getItem('token');

      const response = await fetch(`http://127.0.0.1:8000/api/invitationresponse/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: invitation.id,
          action: 'reject'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reject invitation');
      }

      onReject(invitation.id);
    } catch (err) {
      setError('Failed to reject invitation. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#111827' }}>
          Contract: {invitation.contract_name}
        </h3>
        <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
          From: {invitation.work_provider_name}
        </p>
        <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
          Status: <span style={{ color: '#059669' }}>{invitation.status}</span>
        </p>
      </div>

      {error && (
        <div style={{
          padding: '8px',
          marginBottom: '12px',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={handleAcceptClick}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Processing...' : 'Accept'}
        </button>
        <button
          onClick={handleRejectClick}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Processing...' : 'Reject'}
        </button>
      </div>
    </div>
  );
};

// Example usage in parent component:
const InvitationsList = () => {
  const [invitations, setInvitations] = useState([]);

  const handleAccept = (invitationId) => {
    // Update local state or refetch invitations
    setInvitations(prevInvitations =>
      prevInvitations.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: 'accept' }
          : inv
      )
    );
  };

  const handleReject = (invitationId) => {
    // Update local state or refetch invitations
    setInvitations(prevInvitations =>
      prevInvitations.map(inv =>
        inv.id === invitationId
          ? { ...inv, status: 'reject' }
          : inv
      )
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Contract Invitations</h2>
      {invitations.map(invitation => (
        <InvitationResponseCard
          key={invitation.id}
          invitation={invitation}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};

export default InvitationsList;
