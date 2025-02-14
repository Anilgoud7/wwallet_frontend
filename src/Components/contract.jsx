// ContractsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContractsPage = () => {
const navigate = useNavigate();


const [stats, setStats] = useState(null);
const [isEditing, setIsEditing] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const BASE_URL = 'http://127.0.0.1:8000';
const getTokenFromSessionStorage = () => sessionStorage.getItem('AccessToken');const bearerToken = getTokenFromSessionStorage();

  useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
         
          const statsResponse = await fetch(`${BASE_URL}/api/contracts/summary/`, {
            headers: { Authorization: `Bearer ${bearerToken}` },
          });
  
          
  
         
          const statsData = await statsResponse.json();
          
          
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
  

  // Navigation handlers
  const handleCreateContractClick = () => navigate('/createcontract');
  const handleContractListClick = () => navigate('/contract-list');
  const handleContractCreateListClick = () => navigate('/contractcreated-list');
  const handleInvitationListClick = () => navigate('/contract-invitation');
  const handleContractReceivedListClick = () => navigate('/receivedcontracts');
  const handlePaymenthistoryClick = () => navigate('/paymenthistory');

  // Check if stats is null or undefined
  if (!stats) {
    return <div>Loading contract data...</div>;
  }

  return (
    <div className="contracts-container">
      <h2>Contracts</h2>
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
        <div className="action-card" onClick={handleInvitationListClick}>
          <h3>Invitations</h3>
          <p className="stat-number">{stats.pending_invitations}</p>
        </div>
        <div className="action-card" onClick={handleCreateContractClick}>
          <h3>Create Contract</h3>
          <p>Start creating a new contract for your needs.</p>
        </div>
        <div className="action-card" onClick={handlePaymenthistoryClick}>
          <h3>payment history</h3>
          
        </div>
      </div>
    </div>
  );
};

export default ContractsPage;