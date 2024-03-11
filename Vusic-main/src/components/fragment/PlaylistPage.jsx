import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddMusic from './AddMusic';
import axios from 'axios';
import '../Pages/css/PlaylistPage.css';

const PlaylistPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/playlists/${id}`);
                setPlaylist(response.data);
            } catch (error) {
                console.error('Error fetching playlist:', error);
            }
        };

        const fetchSongs = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/playlists/${id}/songs`);
                setSongs(response.data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchPlaylist();
        fetchSongs();
    }, [id]);

    if (!playlist) {
        return <div>Loading...</div>;
    }

    const handleSongAdded = async (newSong) => {
        try {
            await axios.post(`http://localhost:8080/api/playlists/${id}/songs`, newSong);
            // After adding the song, refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const handleDeleteSong = async (songId) => {
        try {
            await axios.delete(`http://localhost:8080/api/playlists/${id}/songs/${songId}`);
            // After deletion, fetch songs again to reflect the changes
            const response = await axios.get(`http://localhost:8080/api/playlists/${id}/songs`);
            setSongs(response.data);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div>
            <h1>{playlist.name}</h1>
            <AddMusic playlistId={id} onSongAdded={handleSongAdded} />
            <div>
                <h2>Songs in Playlist:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Track Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr key={song.id}>
                                <td>{song.name}</td>
                                <td>
                                    <button onClick={() => handleDeleteSong(song.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PlaylistPage;
