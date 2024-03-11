package org.example.mplayer.repositories;

import org.example.mplayer.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {
}
