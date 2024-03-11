package org.example.mplayer.models;


import jakarta.persistence.*;

@Entity
@Table(name = "ratings")
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    @JoinColumn(name = "song_id", nullable = false)
//    private Song song;
//
//    public Rating(Long id, Song song, User user, int rating) {
//        this.id = id;
//        this.song = song;
//        this.user = user;
//        this.rating = rating;
//    }

    public Rating() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Song getSong() {
//        return song;
//    }
//
//    public void setSong(Song song) {
//        this.song = song;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int rating;

    // Getters and setters
}
