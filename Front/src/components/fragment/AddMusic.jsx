// AddMusic.js
import React, { useState } from 'react';
import axios from 'axios';

const AddSong = ({ playlistId, onSongAdded }) => {
    const [songName, setSongName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/playlists/${playlistId}/songs`, {
                name: songName
            });
            console.log('Song added to playlist:', response.data);
            onSongAdded(songName); // Call the callback function to notify PlaylistPage of the added song
            setSongName('');
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    return (
        <div>
            <h2>Add Song to Playlist</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="Enter song name"
                />
                <button type="submit">Add Song to Playlist</button>
            </form>
        </div>
    );
};

export default AddSong;
