import './App.scss';
import Home from "../components/Pages/Home";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "../components/Pages/Login";
import {ThemeContext, themes} from "../api/Theme";
import musicDB from "../db/music";
import {useDispatch, useSelector} from "react-redux";
import {setPlaylist} from "../actions/actions";
import React, { useState, useEffect } from 'react';
import AddPlaylist from '../components/fragment/AddPlaylist';
import Playlist from '../components/fragment/Playlist';

const App = () => {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // const fetchSongs = async () => {
  //   const apiKey = 'jo8MHCRvSsp9jlf1oZgKHk9g2AT9L4L88DlgKiQB'; // Replace with your actual API key
  //   const url = `https://www.freesound.org/apiv2/search/text/?query=${searchQuery}&token=${apiKey}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setSongs(data.results);
  //   } catch (error) {
  //     console.error('Error fetching songs:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Fetch songs on initial render
  //   fetchSongs();
  // }, []);

  // const handleSearch = (event) => {
  //   setSearchQuery(event.target.value);
  //   fetchSongs();
  // };

  return (
    <div>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            <h4>{song.name}</h4>
            <p>{song.description}</p>
            {/* Display song information and link to Freesound page for ethical use */}
            <a href={song.url} target="_blank">View on Freesound</a>
          </li>
        ))}
      </ul>
      <ThemeContext.Provider value={themes.light}>
            <>
                <Router>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <Route path="/home" component={Home}/>
                    </Switch>
                </Router>
            </>
        </ThemeContext.Provider>
    </div>
  );
};

export default App;