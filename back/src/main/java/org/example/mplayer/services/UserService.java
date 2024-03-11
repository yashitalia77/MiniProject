package org.example.mplayer.services;

import org.example.mplayer.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Implement methods for user registration, authentication, etc.
}