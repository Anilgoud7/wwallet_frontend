import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ContractDetailsPage = () => {
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [contracts, setContracts] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const { contractId } = useParams();
  const navigate = useNavigate();


  const apiUrl = `http://127.0.0.1:8000/api/aicontractlist/${contractId}/`;
  const contractsApiUrl = "http://127.0.0.1:8000/api/aicontractworkprovider/";
  const usersApiUrl = "http://127.0.0.1:8000/api/search/";
  const createPaymentUrl = "http://127.0.0.1:8000/api/create_payment/";

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
        console.log("data",data);
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

  const handleCreatePayment = async () => {
    try {
      setPaymentLoading(true);
      const token = sessionStorage.getItem("AccessToken");

      if (!token) {
        throw new Error("Session token not found. Please log in.");
      }

      const response = await fetch(createPaymentUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: contractId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment");
      }

      const data = await response.json();
      // You can add success notification here or redirect to payments page
      alert("Payment created successfully!");
      navigate("/payment",{ state: { contractId: contract.id }});
  
    } catch (error) {
      setError(error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

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
  const handlePaymentAck = () => {
    navigate("/acknowledgepayment");
  }

  const handleInvite = () =>{
    console.log("Contract ID:", contract.id);
    navigate("/invitation",{ state: { contractId: contract.id } });
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
          <strong>members:</strong> {contract.members.join(', ')}
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
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        <button
          onClick={handleInvite}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          Invite
        </button>

        <button
          onClick={handleCreatePayment}
          disabled={paymentLoading}
          style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: paymentLoading ? "not-allowed" : "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: paymentLoading ? 0.7 : 1
          }}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          {paymentLoading ? "Creating Payment..." : "Create Payment"}
        </button>

        
      </div>

      
    </div>
  );
};

export default ContractDetailsPage;