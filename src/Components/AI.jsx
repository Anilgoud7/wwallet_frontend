import React, { useState } from 'react';
import './AIChatPage.css'; // Add styles for the chat

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Predefined AI responses
  const predefinedResponses = {
    "hello": "Hello! How can I assist you today?",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "bye": "Goodbye! Have a great day!",
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
  
    // Add the user's message to the chat
    setMessages([...messages, { sender: 'user', text: inputMessage }]);
    setInputMessage('');
    setLoading(true);
  
    try {
      // Call the backend AI API
      const response = await fetch('http://127.0.0.1:8000/api/ai/', {
        method: 'POST',
        headers: {
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
  
      // Add the AI's response to the chat
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
      <h1 className="chat-title">AI Chat</h1>

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
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default AIChatPage;
