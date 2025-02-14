import React, { useState, useEffect } from "react";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setError('');
        const token = sessionStorage.getItem('AccessToken');
        console.log("token", token)
        
        if (!token) {
          throw new Error('Session token not found. Please log in.');
        }
        
        const response = await fetch("http://127.0.0.1:8000/api/payment_history/", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch payment history");
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600 text-sm">Loading payment history...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500 text-sm p-4">Error: {error}</p>
    </div>
  );

  return (
    <div className="w-full px-2 py-4 md:px-4 max-w-4xl mx-auto">
      <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 px-2">Payment History</h2>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="bg-white p-3 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-gray-600">ID:</div>
              <div>{payment.id}</div>
              
              <div className="text-gray-600">Contract:</div>
              <div>{payment.contract}</div>
              
              <div className="text-gray-600">Sender:</div>
              <div>{payment.sender}</div>
              
              <div className="text-gray-600">Amount:</div>
              <div>{payment.amount}</div>
              
              <div className="text-gray-600">Type:</div>
              <div>{payment.type}</div>
              
              <div className="text-gray-600">Status:</div>
              <div className={payment.status === "paid" ? "text-green-600" : "text-red-600"}>
                {payment.status}
              </div>
              
              <div className="text-gray-600">Date:</div>
              <div>{payment.created_on}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white p-6 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-sm font-medium text-gray-600">ID</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Contract ID</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Sender</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Type</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm">{payment.id}</td>
                  <td className="p-3 text-sm">{payment.contract}</td>
                  <td className="p-3 text-sm">{payment.sender}</td>
                  <td className="p-3 text-sm">{payment.amount}</td>
                  <td className="p-3 text-sm">{payment.type}</td>
                  <td className={`p-3 text-sm ${payment.status === "paid" ? "text-green-600" : "text-red-600"}`}>
                    {payment.status}
                  </td>
                  <td className="p-3 text-sm">{payment.created_on}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;