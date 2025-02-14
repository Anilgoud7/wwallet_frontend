import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ContractDetailsPage = () => {
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [contracts, setContracts] = useState([]);

  const { contractId } = useParams();
  const navigate = useNavigate();

  const apiUrl = `http://127.0.0.1:8000/api/aicontractlist/`;
  const contractsApiUrl = "http://127.0.0.1:8000/api/aicontractworkprovider/";

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        setError("");
        const token = sessionStorage.getItem("AccessToken");

        if (!token) {
          throw new Error("Session token not found. Please log in.");
        }

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contract details. Please try again.");
        }

        const data = await response.json();
        setContract(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, [contractId, apiUrl]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const token = sessionStorage.getItem("AccessToken");

        if (!token) {
          throw new Error("Session token not found. Please log in.");
        }

        const response = await fetch(contractsApiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch contracts list.");
        }

        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, [contractsApiUrl]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleBack = () => {
    navigate("/aicontractlist");
  };

  const handleAttendance = (memberId, date) => {
    const key = `${contractId}-${date}-${memberId}`;
    setAttendance((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!contract) return <div>No contract found</div>;

  const startDate = new Date(contract.start_date);
  const endDate = new Date(contract.end_date);
  const daysCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={handleBack}
        style={{ marginBottom: "20px", padding: "10px", cursor: "pointer" }}
      >
        Back to Contract List
      </button>

      <h1>Contract Details</h1>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <strong>Contract ID:</strong> {contract.id}
        </p>
        <p>
          <strong>Work Provider:</strong> {contract.work_provider}
        </p>
        <p>
          <strong>Amount:</strong> ₹{contract.amount}
        </p>
        <p>
          <strong>Start Date:</strong> {formatDate(contract.start_date)}
        </p>
        <p>
          <strong>End Date:</strong> {formatDate(contract.end_date)}
        </p>
        <p>
          <strong>Created At:</strong> {formatDate(contract.created_at)}
        </p>
        <p>
          <strong>Updated At:</strong> {formatDate(contract.updated_at)}
        </p>
      </div>

      <h2>Attendance</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {Array.from({ length: daysCount }).map((_, idx) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + idx);

          if (date > endDate) return null;

          const formattedDate = date.toDateString();
          const key = `${contractId}-${formattedDate}-memberId`;

          return (
            <button
              key={idx}
              onClick={() => handleAttendance("memberId", formattedDate)}
              style={{
                padding: "10px",
                backgroundColor: attendance[key] ? "green" : "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {formatDate(date)}
            </button>
          );
        })}
      </div>

      <h2>Available Contracts</h2>
      <select
        onChange={(e) => {
          const selected = contracts.find((c) => c.id === Number(e.target.value));
          if (selected) navigate(`/contract/${selected.id}`);
        }}
        style={{ marginTop: "20px", padding: "10px", width: "100%" }}
      >
        <option value="">Select a Contract</option>
        {contracts.map((contract) => (
          <option key={contract.id} value={contract.id}>
            {contract.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContractDetailsPage;
