package org.example.mplayer.services;

import org.example.mplayer.models.Playlist;
import org.example.mplayer.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public Playlist getPlaylistById(Long playlistId) {
        return playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found with id: " + playlistId));
    }


    // Implement additional methods for playlist management if needed
}
