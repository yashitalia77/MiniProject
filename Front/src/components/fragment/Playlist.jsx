import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/scss/Playlist.scss';
import { useSelector } from "react-redux";
import MusicCard from "./MusicCard";
import Container from "./Container";
import AddPlaylist from './AddPlaylist';
import DeletePlaylist from './DeletePlaylist';
import '../Pages/css/Playlist.css'
import {Link} from 'react-router-dom';

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
        <div className='playlist-main'>
            <AddPlaylist />
            <h2>Playlists</h2>
            <table>
              <thead>
                <tr>
                  <th>Playlist Name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {playlists.map((playlist) => (
                  <tr key={playlist.id}>
                    <td>
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
                          <Link to={`/home/playlist/${playlist.id}`}>{playlist.name} </Link>
                        </>
                      )}
                    </td>
                    <td>
                      {editPlaylistId !== playlist.id && (
                        <button onClick={() => handleEdit(playlist.id, playlist.name)}>Edit</button>
                      )}
                    </td>
                    <td>
                      <DeletePlaylist id={playlist.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    );
};

export default Playlist;
