package org.example.mplayer.repositories;

import org.example.mplayer.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // Add custom query methods if needed
}