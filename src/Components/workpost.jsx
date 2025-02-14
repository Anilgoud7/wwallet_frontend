import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkPost = () => {
  const [workFeedData, setWorkFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://127.0.0.1:8000/api/workpost/";
  const bearerToken = sessionStorage.getItem('AccessToken');

  useEffect(() => {
    const fetchWorkFeedData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { Authorization: `Bearer ${bearerToken}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch work feed data');
        }

        const data = await response.json();
        setWorkFeedData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkFeedData();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <button
        onClick={() => navigate('/workfeed')}
        style={{
          background: '#4CAF50',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '20px'
        }}>
        Back to Work Feed
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : workFeedData.length === 0 ? (
        <p>No work feed data available.</p>
      ) : (
        workFeedData.map(item => (
          <div key={item.work_feed.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
            <h3>{item.work_feed.title}</h3>
            <p>{item.work_feed.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Amount per Person:</strong> ₹{item.work_feed.Amount}</span>
              <span><strong>Members Required:</strong> {item.work_feed.total_members}</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <strong>Project Duration:</strong> {item.work_feed.start_date} to {item.work_feed.end_date}
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>Proposals:</h4>
              {item.comments.length === 0 ? (
                <p>No proposals yet.</p>
              ) : (
                item.comments.map(comment => (
                  <div key={comment.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                    <p><strong>Sender ID:</strong> {comment.sender}</p>
                    <p><strong>Proposal:</strong> {comment.proposal}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkPost;
