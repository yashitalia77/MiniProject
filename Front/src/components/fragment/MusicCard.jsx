import React, { useEffect, useState } from 'react';
import '../assets/scss/MusicCard.scss';
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useDispatch } from "react-redux";
import { increaseTimesPlayed, setCurrentPlaying } from "../../actions/actions";
import Name from "./Name";
import { Skeleton } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import axios from 'axios';

function MusicCard(props) {
    const { id, name, img, author_name } = props.music;
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');
    const [isHovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/playlists');
            setPlaylists(response.data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    function handleResponse() {
        setHovered(!isHovered);
    }

    function handlePlay() {
        dispatch(setCurrentPlaying(props.music))
        dispatch(increaseTimesPlayed(id));
    }

    const handleAddToPlaylist = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/playlists/${selectedPlaylist}/music`, {
                id: id // Assuming id is the unique identifier of the song
            });
            console.log('Song added to playlist:', response.data);
            // Optionally, you can show a success message or update UI
        } catch (error) {
            console.error('Error adding song to playlist:', error);
        }
    };

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className={"music-card"}>
            {
                !loaded ?
                    <div className={"Skeleton-top"}>
                        <Skeleton variant="rect" width={210} height={210} />
                        <Box pt={0.5}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    </div>
                    :
                    <>
                        <div onClick={handlePlay} className={"music-card-cover"} onMouseOver={handleResponse}>
                            <img src={require("../assets/img/" + img)} alt={name} />
                            <div className="play-circle">
                                <PlayCircleFilledWhiteIcon />
                            </div>
                        </div>
                        <React.Fragment>
                            <Name name={name} className={"song-name"} length={name.length} />
                            <Name name={author_name} className={"author-name"} length={author_name.length} />
                        </React.Fragment>
                        <div>
                        </div>
                    </>
            }
        </div>
    );
}

export default MusicCard;