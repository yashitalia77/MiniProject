import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/scss/Playlist.scss';
import Container from "../fragment/Container";
import MusicCard from "./MusicCard";
import AddPlaylist from './AddPlaylist';
import DeletePlaylist from './DeletePlaylist';
import './css/Playlist.css'

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [editPlaylistId, setEditPlaylistId] = useState(null);
    const [editedPlaylistName, setEditedPlaylistName] = useState('');

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/playlists');
                setPlaylists(response.data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    const handleEdit = (playlistId, playlistName) => {
        setEditPlaylistId(playlistId);
        setEditedPlaylistName(playlistName);
    };

    const handleSaveEdit = async (playlistId) => {
        try {
            await axios.put(`http://localhost:8080/api/playlists/${playlistId}`, {
                name: editedPlaylistName
            });
            // Refresh playlists after edit
            const response = await axios.get('http://localhost:8080/api/playlists');
            setPlaylists(response.data);
            // Reset edit state
            setEditPlaylistId(null);
            setEditedPlaylistName('');
        } catch (error) {
            console.error('Error editing playlist:', error);
        }
    };

    return (
        <Container>
            {
        <div>
            <AddPlaylist />
            <h2>Playlists</h2>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        {editPlaylistId === playlist.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editedPlaylistName}
                                    onChange={(e) => setEditedPlaylistName(e.target.value)}
                                />
                                <button onClick={() => handleSaveEdit(playlist.id)}>Save</button>
                            </>
                        ) : (
                            <>
                                {playlist.name}
                                <button onClick={() => handleEdit(playlist.id, playlist.name)}>Edit</button>
                                <DeletePlaylist id={playlist.id} />
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
}
</Container>
    );
};

export default Playlist;
