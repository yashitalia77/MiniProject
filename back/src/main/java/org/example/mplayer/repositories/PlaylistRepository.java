package org.example.mplayer.repositories;

import org.example.mplayer.models.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    // Add custom query methods if needed
    Optional<Playlist> findByName(String name);
}