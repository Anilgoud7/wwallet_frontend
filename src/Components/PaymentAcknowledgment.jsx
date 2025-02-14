import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentAcknowledgment = () => {
  const location = useLocation();
  const contractId = location.state?.contractId;

  // Contract States
  const [contract, setContract] = useState({
    id: "",
    workProvider: "",
    members: [],
    amount: "",
    startDate: "",
    endDate: "",
  });

  // Payment States
  const [paymentType, setPaymentType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  // Form States
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [debugInfo, setDebugInfo] = useState(null);

  const paymentTypes = [
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "upi", label: "UPI" },
    { value: "cash", label: "Cash" },
  ];

  const API_URL = "http://127.0.0.1:8000/api/payment_ack/";
  const CONTRACT_API_URL = `http://127.0.0.1:8000/api/aicontractlist/${contractId}/`;

  // Fetch contract details when component mounts
  useEffect(() => {
    const fetchContractDetails = async () => {
      if (!contractId) {
        setError("No contract ID provided");
        return;
      }

      const token = sessionStorage.getItem("AccessToken");
      if (!token) {
        setError("No access token found. Please log in again.");
        return;
      }

      try {
        const response = await fetch(CONTRACT_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContract({
          id: data.id,
          workProvider: data.work_provider,
          members: data.members,
          amount: data.amount,
          startDate: data.start_date,
          endDate: data.end_date,
        });
        
        // Set the payment amount to contract amount by default
        setPaymentAmount(data.amount);
      } catch (err) {
        setError(`Failed to fetch contract details: ${err.message}`);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const token = sessionStorage.getItem("AccessToken");

    if (!token) {
      setError("No access token found. Please log in again.");
      setIsLoading(false);
      return;
    }

    if (!paymentType || !paymentStatus || !paymentAmount) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const payload = {
      contractId: contract.id,
      paymentType,
      paymentStatus,
      paymentAmount,
    };

    try {
      console.log("Submitting payment data:", payload);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      setSuccessMessage("Payment acknowledgment submitted successfully!");
      setError("");
      setDebugInfo(null);
    } catch (err) {
      const errorInfo = {
        type: "submit_error",
        message: err.message,
        payload,
        timestamp: new Date().toISOString(),
      };
      console.error("Form submission failed:", errorInfo);
      setError(`Failed to submit payment: ${err.message}`);
      setDebugInfo(errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-4">Payment Acknowledgment Form</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {debugInfo && (
        <div className="bg-gray-100 border border-gray-300 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contract Details */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Contract Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contract ID</label>
              <input
                type="text"
                value={contract.id}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Work Provider</label>
              <input
                type="text"
                value={contract.workProvider}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Members</label>
              <input
                type="text"
                value={contract.members.join(", ")}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contract Amount</label>
              <input
                type="text"
                value={`₹${contract.amount}`}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="text"
                value={contract.startDate}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="text"
                value={contract.endDate}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select payment type</option>
                {paymentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select payment status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Payment Amount</label>
              <input
                type="text"
                value={`₹${contract.amount}`}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
            </div>
            

            
          
            </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isLoading ? "Processing..." : "Submit"}
                </button>
              </form>
              
            </div>
            
        

        
        
  );
};

export default PaymentAcknowledgment;