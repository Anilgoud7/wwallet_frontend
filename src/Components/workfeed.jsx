import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    Amount: '',
    total_members: '',
    start_date: '',
    end_date: ''
  });
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [proposals, setProposals] = useState({});
  const [newProposal, setNewProposal] = useState('');

  const API_URL = "http://127.0.0.1:8000/api/workfeed/";
  const comment_url = "http://127.0.0.1:8000/api/comment/";
  const proposal_url = "http://127.0.0.1:8000/api/comment/";
  const bearerToken = sessionStorage.getItem('AccessToken');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: { Authorization: `Bearer ${bearerToken}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch work feed');
        }

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleProposalChange = (e) => {
    setNewProposal(e.target.value);
  };

  const submitProposal = async (postId) => {
    try {
      const response = await fetch(proposal_url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ work_feed: postId, proposal: newProposal })
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit proposal');
      }
  
      const updatedProposal = await response.json();
  
      setProposals(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), updatedProposal]
      }));
  
      setNewProposal('');
      
      // Show success message
      alert("Proposal submitted successfully!");
  
    } catch (error) {
      console.error("Error submitting proposal:", error);
      alert("Failed to submit proposal. Please try again.");
    }
  };
  
  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
  const submitPost = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setNewPost({
        title: '',
        description: '',
        Amount: '',
        total_members: '',
        start_date: '',
        end_date: ''
      });
      setShowPostModal(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button 
          onClick={() => setShowPostModal(true)}
          style={{ background: '#2196F3', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
          Post Work
        </button>
        <button
          onClick={() => navigate('/workpost')}
          style={{ background: '#FF9800', color: 'white', padding: '10px 15px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          Your Work Posts
        </button>
      </div>
      {showPostModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <h2>Create Work Post</h2>
            <form>
              <input type="text" name="title" placeholder="Title" value={newPost.title} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <textarea name="description" placeholder="Description" value={newPost.description} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <input type="number" name="Amount" placeholder="Amount" value={newPost.Amount} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <input type="number" name="total_members" placeholder="Total Members" value={newPost.total_members} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <input type="date" name="start_date" placeholder="Start Date" value={newPost.start_date} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
              <input type="date" name="end_date" placeholder="End Date" value={newPost.end_date} onChange={handlePostChange} required style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />

              <button type="button" onClick={submitPost} style={{ background: '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>Submit</button>
              <button type="button" onClick={() => setShowPostModal(false)} style={{ background: '#f44336', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>No work feed available. Publish your work requirement.</p>
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Amount per Person:</strong> ₹{post.Amount}</span>
              <span><strong>Members Required:</strong> {post.total_members}</span>
            </div>
            <div style={{ marginTop: '10px' }}>
              <strong>Project Duration:</strong> {post.start_date} to {post.end_date}
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4>Proposals:</h4>
              {proposals[post.id]?.map((proposal, index) => (
                <div key={index} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                  <p>{proposal.text}</p>
                </div>
              ))}
              <textarea
                placeholder="Propose your work..."
                value={newProposal}
                onChange={handleProposalChange}
                style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
              />
              <button
                onClick={() => submitProposal(post.id)}
                style={{ background: '#4CAF50', color: 'white', padding: '8px 12px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
              >
                Submit Proposal
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkFeed;
