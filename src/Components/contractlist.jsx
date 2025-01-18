import React, { useState, useEffect } from 'react';

const ContractListPage = () => {
  const [contracts, setContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const apiUrl = 'http://127.0.0.1:8000/api/contracts/'; // Replace with your actual backend URL

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setError(''); // Clear previous error
        const token = sessionStorage.getItem('Access'); // Retrieve session token

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
        setContracts(data.contracts || []); // Assuming the response has a `contracts` array
        setFilteredContracts(data.contracts || []);
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
      contract.name.toLowerCase().includes(value)
    );
    setFilteredContracts(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contract List</h1>

      {/* Error Message */}
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search Bar */}
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

      {/* Contract List */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>
              ID
            </th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>
              Name
            </th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <tr key={contract.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {contract.id}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {contract.name}
                </td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {contract.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  borderBottom: '1px solid #ddd',
                }}
              >
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
