// DeletePlaylist.jsx
import React from 'react';
import axios from 'axios';

const DeletePlaylist = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/playlists/${id}`);
      // Optionally, you can reload the playlists after deletion
      window.location.reload(); // This is not recommended for large applications
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeletePlaylist;
