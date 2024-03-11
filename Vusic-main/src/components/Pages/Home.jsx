import React, { useContext, useEffect, useState } from "react";
import './css/Home.scss';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "../fragment/Navigation";
import MobileTopNavigation from "../fragment/MobileTopNavigation";
import SideBar from "../fragment/SideBar";
import FooterMusicPlayer from "../fragment/FooterMusicPlayer";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import MusicCardContainer from "../fragment/MusicCardContainer";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../api/Theme";
import Profile from "./Profile";
import AddMusic from "../fragment/AddMusic";
import FooterSelectMusic from "../fragment/FooterSelectMusic";
import CurrentPlayingLarge from "../fragment/CurrentPlayingLarge";
import Search from "./Search";
import About from "./About";
import Playlist from "../fragment/Playlist";
import { Skeleton } from "@material-ui/lab";
import PlaylistPage from '../fragment/PlaylistPage';

function Home() {

    const [screenSize, setScreenSize] = useState(undefined);
    const [currMusic, setCurrMusic] = useState(null);

    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const useStyle = useContext(ThemeContext);
    const { playing, bannerOpen } = useSelector(state => state.musicReducer);

    useEffect(() => {
        setCurrMusic(playing)
    }, [playing]);

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []);

    return (
        <Router>
            <div style={useStyle.component} className={"home-container"}>
                {
                    !loaded ?
                        <div className="Home-skeleton">
                            <Skeleton animation={"wave"} variant={"rect"} height={"100vh"} />
                        </div>
                        :
                        <>
                            {
                                screenSize <= 970 ?
                                    <MobileTopNavigation /> :
                                    <Navigation />
                            }
                            <section className={"home-music-container"}>
                                <div className="sidebar-home">
                                    <SideBar />
                                </div>
                                <div className="main-home">
                                    <Switch>
                                        <Route path="/home" exact component={MusicCardContainer} />
                                        <Route path="/home/search" component={Search} />
                                        <Route path="/home/profile" component={Profile} />
                                        <Route path="/home/add" component={AddMusic} />
                                        <Route path="/home/playlist/:id" component={PlaylistPage} />
                                        <Route path="/home/playlist" component={Playlist} />
                                        <Route path="/home/about" component={About} />
                                        <Route component={Home} />
                                    </Switch>
                                </div>
                            </section>
                            {
                                bannerOpen &&
                                <section className="current-large-banner">
                                    <CurrentPlayingLarge />
                                </section>
                            }
                            <React.Fragment>
                                {
                                    currMusic ?
                                        <FooterMusicPlayer music={currMusic} />
                                        :
                                        <FooterSelectMusic />
                                }
                                {
                                    screenSize <= 970 && <BottomNavigationMobile />
                                }
                            </React.Fragment>
                        </>
                }
            </div>
        </Router>
    );
}

export default Home;
