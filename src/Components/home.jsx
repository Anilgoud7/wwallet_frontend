import React, { useEffect, useState } from 'react';
import '../App.css'; // Import global styles

const Home = () => {
  const [contractsList, setContractsList] = useState([]);
  const [contractsByWorkProvider, setContractsByWorkProvider] = useState([]);
  const [contractsReceivedByWorker, setContractsReceivedByWorker] = useState([]);
  const [contractInvitationsReceived, setContractInvitationsReceived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Define API endpoints
  const API_BASE_URL = 'http://127.0.0.1:8000/api';  // Change this to your actual API base URL
  const endpoints = {
    contractsList: `${API_BASE_URL}/aicontractslist/`,
    contractsByWorkProvider: `${API_BASE_URL}/aicontractworkprovider/`,
    contractsReceivedByWorker: `${API_BASE_URL}/aicontractmember`,
    contractInvitationsReceived: `${API_BASE_URL}/ainvitationresponse/`,
  };

  // Fetch data from all endpoints
  const fetchContractsData = async () => {
    setLoading(true);
    setError('');
    try {
      const [
        contractsListResponse,
        contractsByWorkProviderResponse,
        contractsReceivedByWorkerResponse,
        contractInvitationsReceivedResponse
      ] = await Promise.all([
        fetch(endpoints.contractsList),
        fetch(endpoints.contractsByWorkProvider),
        fetch(endpoints.contractsReceivedByWorker),
        fetch(endpoints.contractInvitationsReceived)
      ]);

      // Parse the responses
      const contractsListData = await contractsListResponse.json();
      const contractsByWorkProviderData = await contractsByWorkProviderResponse.json();
      const contractsReceivedByWorkerData = await contractsReceivedByWorkerResponse.json();
      const contractInvitationsReceivedData = await contractInvitationsReceivedResponse.json();

      // Update the state with the fetched data
      setContractsList(contractsListData);
      setContractsByWorkProvider(contractsByWorkProviderData);
      setContractsReceivedByWorker(contractsReceivedByWorkerData);
      setContractInvitationsReceived(contractInvitationsReceivedData);

    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchContractsData();
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">Contracts Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="contracts-list">
          <div className="contract-category">
            <h2>All Contracts</h2>
            <ul>
              {contractsList.map((contract) => (
                <li key={contract.id}>{contract.name} - {contract.status}</li>
              ))}
            </ul>
          </div>
          <div className="contract-category">
            <h2>Contracts by Work Provider</h2>
            <ul>
              {contractsByWorkProvider.map((contract) => (
                <li key={contract.id}>{contract.name} - {contract.status}</li>
              ))}
            </ul>
          </div>
          <div className="contract-category">
            <h2>Contracts Received by Worker</h2>
            <ul>
              {contractsReceivedByWorker.map((contract) => (
                <li key={contract.id}>{contract.name} - {contract.status}</li>
              ))}
            </ul>
          </div>
          <div className="contract-category">
            <h2>Contract Invitations Received</h2>
            <ul>
              {contractInvitationsReceived.map((invitation) => (
                <li key={invitation.id}>{invitation.contractName} - {invitation.status}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
