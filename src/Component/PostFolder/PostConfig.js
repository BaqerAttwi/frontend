import React, { useState } from 'react';
import axios from 'axios';

const PostComponent = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', text);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8800/routes/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error uploading data.');
      console.error('Error uploading data:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <h2>Post Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Description:</label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostComponent;
