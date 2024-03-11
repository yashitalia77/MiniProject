import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddMusic from './AddMusic';
import MusicCardContainer from './MusicCardContainer';

const PlaylistPage = () => {
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        // Fetch playlist and songs data when component mounts or id changes
        const fetchPlaylistAndSongs = async () => {
            try {
                // Fetch playlist data
                const playlistResponse = await axios.get(`http://localhost:8080/api/playlists/${id}`);
                setPlaylist(playlistResponse.data);

                // Fetch songs data
                const songsResponse = await axios.get(`http://localhost:8080/api/playlists/${id}/songs`);
                setSongs(songsResponse.data);
            } catch (error) {
                console.error('Error fetching playlist or songs:', error);
            }
        };

        fetchPlaylistAndSongs();
    }, [id]);

    const handleSongAdded = async (newSong) => {
        try {
            // Add a new song to the playlist
            await axios.post(`http://localhost:8080/api/playlists/${id}/songs`, newSong);

            // Fetch updated songs data after adding the song
            const songsResponse = await axios.get(`http://localhost:8080/api/playlists/${id}/songs`);
            setSongs(songsResponse.data);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const handleDeleteSong = async (songId) => {
        try {
            // Delete the selected song from the playlist
            await axios.delete(`http://localhost:8080/api/playlists/${id}/songs/${songId}`);

            // Fetch updated songs data after deleting the song
            const songsResponse = await axios.get(`http://localhost:8080/api/playlists/${id}/songs`);
            setSongs(songsResponse.data);
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    // Render loading message until playlist data is fetched
    if (!playlist) {
        return <div>Loading...</div>;
    }

    // Render playlist and songs data
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
                                    <button onClick={() => handleDeleteSong(song.id)} style={{ backgroundColor: 'red' }}>Delete</button>
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
