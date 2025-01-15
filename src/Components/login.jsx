import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../App.css';  // Make sure this path is correct

const MobileOTPLogin = () => {
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };


  const handleSendOTP = async () => {
    setError('');
    
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/send-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send OTP');
      }
  
      // Assuming the response contains a message or status indicating success
      console.log('OTP sent successfully:', data);
      setStep(2); // Move to the OTP verification step
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError('');
  
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/verify-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: otp,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }
  
      console.log('OTP verified successfully:', data);
      navigate('/home');
      // Handle post-verification logic, e.g., redirect to dashboard
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/send-otp/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
  
      console.log('OTP resent successfully:', data);
      setError('OTP resent successfully. Please check your messages.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    


    
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">
          {step === 1 ? 'Login with Mobile' : 'Enter OTP'}
        </h2>
        
        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="form-container">
            <div className="form-group">
              <label className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                className="form-input"
              />
            </div>
            <button
              className="submit-button"
              onClick={handleSendOTP}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="form-container">
            <div className="form-group">
              <label className="form-label">
                Enter OTP sent to {phoneNumber}
              </label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className="form-input"
              />
            </div>
            <button
              className="submit-button"
              onClick={handleVerifyOTP}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="footer-buttons">
            <button
              className="link-button"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Change Number
            </button>
            <button
              className="link-button"
              onClick={handleResendOTP}
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileOTPLogin;