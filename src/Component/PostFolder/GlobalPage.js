import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

import NavBar from '../NavBar/Nav';
const GlobalPage = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:8800/routes/getallposts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const postsWithUsernames = await Promise.all(
          response.data.map(async (post) => {
            const usernameResponse = await axios.get(`http://localhost:8800/routes/getusername/${post.user_id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            return {
              ...post,
              username: usernameResponse.data.username
            };
          })
        );

        setPosts(postsWithUsernames);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const addFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post(
        'http://localhost:8800/routes/addfriend',
        { friend_id: friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(response.data.message);
      console.log('Friend request sent successfully');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <div className="Global-container">
      <NavBar />
      <h2>Posts</h2>
      {message && <p>{message}</p>}
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/PostDetail/${post.id}`} className="post-link">
              <div className="username-container">
                <p className="post-username">{post.username}</p>
                
                <img src={`../../Images/Icons/Add.png`} alt="Add Friend" className="add-friend-icon" onClick={() => addFriend(post.user_id)} />
              
              </div>
              <img className="post-image" src={`../../Images/Posts/${post.image}`} alt={post.description} />
                <p style={{overflow:'hidden'}}>{post.description}</p>
              <div>
                <p>Likes: {post.likes}</p> {/* Display number of likes */}
                <p>Comments: {post.comments}</p> {/* Display number of comments */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GlobalPage;
