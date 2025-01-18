import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateContract = () => {
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const apiUrl = 'http://127.0.0.1:8000/api/aicreate-contract/';

  const getToken = () => {
    try {
      const accesstoken = sessionStorage.getItem('AccessToken');
      if (accesstoken !== null) {
        console.log('Retrieved token from session storage:', accesstoken);
        return accesstoken;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const token = getToken(); // Retrieve token from sessionStorage
  if (!token) {
    setError('No valid token found. Please log in again.');
    setIsLoading(false);
    return;
  }

  console.log('Token:', token);

  // Validation
  if (!amount || !startDate || !endDate) {
    setError('All fields are required.');
    setIsLoading(false);
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    setError('Amount must be a valid positive number.');
    setIsLoading(false);
    return;
  }

  if (new Date(startDate) > new Date(endDate)) {
    setError('Start Date cannot be later than End Date.');
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: parseFloat(amount),
        startDate,
        endDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create contract');
    }

    navigate('/contractinvitation');
  } catch (err) {
    console.error('Error:', err);
    setError('Failed to create contract. Please try again.');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="grid grid-cols-1 gap-6 max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Contract</h2>
          <p className="mt-2 text-sm text-gray-600">Enter the contract details below</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isLoading ? 'Processing...' : 'Create Contract'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateContract;
