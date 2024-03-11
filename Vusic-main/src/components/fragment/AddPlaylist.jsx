// AddPlaylist.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddPlaylist = () => {
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/playlists', {
        name: playlistName
      });
      console.log('Playlist added:', response.data);
      setPlaylistName('');
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };

  return (
    <div>
      <h2>Add Playlist</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Enter playlist name"
        />
        <button type="submit">Add Playlist</button>
      </form>
    </div>
  );
};

export default AddPlaylist;
