// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  // Example contract details
  const contractDetails = {
    id: "12345",
    name: "Project Alpha",
    description: "This contract is for the development of Project Alpha.",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
  };

  // API endpoints
  const searchApiUrl = "https://backend.example.com/api/search-users"; // Replace with your actual user search API
  const inviteApiUrl = "https://backend.example.com/api/send-invite"; // Replace with your actual invite API

  const handleSearch = async () => {
    try {
      setError(""); // Clear previous error
      const response = await fetch(`${searchApiUrl}?query=${searchQuery}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const data = await response.json();
      setSearchResults(data.users || []); // Assuming the response has a `users` array
    } catch (error) {
      setError("Error fetching search results. Please try again.");
    }
  };

  const handleAddMember = (user) => {
    if (!members.find((member) => member.id === user.id)) {
      setMembers([...members, user]);
    }
  };

  const handleSendInvite = async () => {
    try {
      setError(""); // Clear previous error

      const response = await fetch(inviteApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contractId: contractDetails.id,
          members: members.map((member) => member.id), // Send member IDs
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send invites.");
      }

      alert("Invites sent successfully!");
      setMembers([]); // Clear members after successful invite
    } catch (error) {
      setError("Error sending invites. Please try again.");
    }
  };

  return (
    <div className="invite-page">
      {/* Contract Details Section */}
      <div className="contract-details">
        <h2>Contract Details</h2>
        <p><strong>ID:</strong> {contractDetails.id}</p>
        <p><strong>Name:</strong> {contractDetails.name}</p>
        <p><strong>Description:</strong> {contractDetails.description}</p>
        <p><strong>Start Date:</strong> {contractDetails.startDate}</p>
        <p><strong>End Date:</strong> {contractDetails.endDate}</p>
      </div>

      {/* Search Section */}
      <div className="grid-container">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search for users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Search Results Grid */}
        <div className="results-grid">
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>
                {user.name}
                <button onClick={() => handleAddMember(user)}>Add</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Members Grid */}
        <div className="members-grid">
          <h2>Members</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invite Button */}
        <div className="invite-button">
          <button onClick={handleSendInvite} disabled={members.length === 0}>
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
