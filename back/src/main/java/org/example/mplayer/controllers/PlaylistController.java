package org.example.mplayer.controllers;

import org.example.mplayer.models.Playlist;
import org.example.mplayer.models.Song;
import org.example.mplayer.repositories.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/playlists")
public class PlaylistController {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistController(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> getAllPlaylists() {
        List<Playlist> playlists = playlistRepository.findAll();
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/{id}/songs")
    public ResponseEntity<List<Song>> getSongsByPlaylistId(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistRepository.findById(id);
        if (playlistOptional.isPresent()) {
            Playlist playlist = playlistOptional.get();

// Assuming your Playlist class has a method getSongs() that returns a Set<Song>

            Set<Song> songSet = playlist.getSongs();
            List<Song> songs = new ArrayList<>(songSet);

            return ResponseEntity.ok(songs);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/search")
    public ResponseEntity<List<Playlist>> searchPlaylists(@RequestParam(required = false) String name) {
        if (name == null || name.isEmpty()) {
            return ResponseEntity.ok(playlistRepository.findAll()); // Return all playlists if no name provided
        }

        Optional<Playlist> playlistOptional = playlistRepository.findByName(name);
        return playlistOptional.map(playlists -> ResponseEntity.ok(Collections.singletonList(playlists)))
                .orElseGet(() -> ResponseEntity.notFound().build()); // Return not found if no playlist with that name exists
    }

    @GetMapping("/{id}")
    public ResponseEntity<Playlist> getPlaylistById(@PathVariable Long id) {
        Optional<Playlist> playlistOptional = playlistRepository.findById(id);
        return playlistOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Playlist> addPlaylist(@RequestBody Playlist playlist) {
        Playlist newPlaylist = playlistRepository.save(playlist);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPlaylist);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Playlist> editPlaylist(@PathVariable Long id, @RequestBody Playlist playlistDetails) {
        Optional<Playlist> optionalPlaylist = playlistRepository.findById(id);
        if (optionalPlaylist.isPresent()) {
            Playlist playlist = optionalPlaylist.get();
            playlist.setName(playlistDetails.getName());
            Playlist updatedPlaylist = playlistRepository.save(playlist);
            return ResponseEntity.ok(updatedPlaylist);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        if (playlistRepository.existsById(id)) {
            playlistRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
