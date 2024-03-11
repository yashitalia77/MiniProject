package org.example.mplayer.services;

import org.example.mplayer.repositories.RatingRepository;
import org.springframework.stereotype.Service;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    // Implement methods for rating songs, etc.
}