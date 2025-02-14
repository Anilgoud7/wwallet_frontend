import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContractListPage = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // React Router navigation hook

  const apiUrl = 'http://127.0.0.1:8000/api/aicontractmember/';

  useEffect(() => {
    const fetchContracts = async () => {
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
          throw new Error('Failed to fetch contracts. Please try again.');
        }

        const data = await response.json();
        setContracts(data); // Updated to use data directly since it's an array
        setFilteredContracts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchContracts();
  }, [apiUrl]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = contracts.filter((contract) =>
      contract.id.toString().includes(value) ||
      contract.work_provider.toLowerCase().includes(value) ||
      contract.amount.toString().includes(value)
    );
    setFilteredContracts(filtered);
  };

  // Format date string to local date format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleRowClick = (contractId) => {
    
    navigate(`/contractdetail/${contractId}`); // Navigate to the detailed page for the contract
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contract List</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Search contracts..."
        value={search}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
        }}
      />

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
      }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Work Provider</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Amount</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Start Date</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>End Date</th>
           
          </tr>
        </thead>
        <tbody>
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <tr
                key={contract.id}
                onClick={() => handleRowClick(contract.id)}
                style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
              >
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.work_provider}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>₹{contract.amount}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatDate(contract.start_date)}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{formatDate(contract.end_date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{
                textAlign: 'center',
                padding: '20px',
                borderBottom: '1px solid #ddd',
              }}>
                No contracts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContractListPage;
