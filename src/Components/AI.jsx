import React, { useState } from 'react';
import './AIChatPage.css';

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [feeding, setFeeding] = useState(false);
  const getTokenFromSessionStorage = () => sessionStorage.getItem('AccessToken');
  const bearerToken = getTokenFromSessionStorage();

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;


    setMessages([...messages, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/ai/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI backend');
      }

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: data.response || 'Sorry, no response received.' },
      ]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: 'There was an error processing your request. Please try again later.' },
      ]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="chat-container">
      <h1 className="chat-title">Work wallet AI </h1>
      
      <div className="button-container">
        <button 
          className="feed-button" 
         
          disabled={feeding}
        >
          {feeding ? 'Feeding Data...' : 'AI provides information regarding your work and earnings'}
        </button>
      </div>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}

        {loading && (
          <div className="chat-message ai">
            <p>...</p>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="chat-input"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatPage;