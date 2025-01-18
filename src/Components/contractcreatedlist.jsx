import React, { useState, useEffect } from 'react';

const ContractsCreatedListPage = () => {
  // State to hold contract data
  const [createdContracts, setCreatedContracts] = useState([]);
  const [filteredContracts, setFilteredContracts] = useState([]);
  const [search, setSearch] = useState('');

  // Simulate fetching data (Replace with API call)
  useEffect(() => {
    const fetchContracts = async () => {
      const mockCreatedContracts = [
        { id: 1, name: 'Created Contract A', date: '2025-01-10', status: 'Active' },
        { id: 2, name: 'Created Contract B', date: '2025-01-12', status: 'Pending' },
        { id: 3, name: 'Created Contract C', date: '2025-01-15', status: 'Completed' },
      ];
      setCreatedContracts(mockCreatedContracts);
      setFilteredContracts(mockCreatedContracts);
    };

    fetchContracts();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = createdContracts.filter((contract) =>
      contract.name.toLowerCase().includes(value)
    );
    setFilteredContracts(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Contracts Created List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search created contracts..."
        value={search}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          fontSize: '16px',
        }}
      />

      {/* Created Contracts List */}
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
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Name</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Date Created</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.length > 0 ? (
            filteredContracts.map((contract) => (
              <tr key={contract.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.id}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.date}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{contract.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  borderBottom: '1px solid #ddd',
                }}
              >
                No created contracts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsCreatedListPage;
