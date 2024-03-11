package org.example.mplayer.controllers;

import org.example.mplayer.models.Song;
import org.example.mplayer.repositories.PlaylistRepository;
import org.example.mplayer.repositories.SongRepository;
import org.example.mplayer.services.PlaylistService;
import org.example.mplayer.services.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/playlists/{playlistId}/songs")
public class SongController {

    @Autowired
    private SongService songService;

    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistRepository playlistRepository;

    @Autowired
    private SongRepository songRepository;

    @PostMapping
    public Song addSongToPlaylist(@PathVariable Long playlistId, @RequestBody Song song) {
        return songService.addSongToPlaylist(playlistId, song);
    }

    @GetMapping("/{songId}")
    public Optional<Song> getSongById(@PathVariable Long songId) {
        return songService.getSongById(songId);
    }


    @DeleteMapping("/{songId}")
    public void removeSongFromPlaylist(@PathVariable Long playlistId, @PathVariable Long songId) {
        songService.removeSongFromPlaylist(playlistId, songId);
    }
}
