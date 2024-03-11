package org.example.mplayer.services;

import jakarta.transaction.Transactional;
import org.example.mplayer.models.Playlist;
import org.example.mplayer.models.Song;
import org.example.mplayer.repositories.PlaylistRepository;
import org.example.mplayer.repositories.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepository;

    @Autowired
    private PlaylistRepository playlistRepository;

    public Song addSongToPlaylist(Long playlistId, Song song) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found with id: " + playlistId));

        // Save the song if it's not yet persisted
        if (song.getId() == null) {
            song = songRepository.save(song);
        }

        // Add the song to the playlist and save the playlist
        playlist.getSongs().add(song);
        playlistRepository.save(playlist);

        return song;
    }

    public Optional<Song> getSongById(Long id) {
        return songRepository.findById(id);
    }

    @Transactional
    public void removeSongFromPlaylist(Long playlistId, Long songId) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow(() -> new RuntimeException("Playlist not found"));
        Song song = songRepository.findById(songId).orElseThrow(() -> new RuntimeException("Song not found"));
        playlist.getSongs().remove(song);
        song.getPlaylists().remove(playlist);
        playlistRepository.save(playlist);
    }
}
