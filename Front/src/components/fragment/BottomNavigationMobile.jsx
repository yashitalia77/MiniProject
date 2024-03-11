import React, {useState} from "react";
import '../assets/scss/BottomNavigation.scss';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { PlaylistPlay, PlaylistPlayOutlined } from "@material-ui/icons";

function BottomNavigationMobile() {
    const [menuItems, setMenuItem] = useState([
        {
            id: 0,
            icon: <HomeOutlinedIcon/>,
            href: "/home",
            label: "Home"
        },
        {
            id: 1,
            icon: <SearchIcon/>,
            href: "/home/search",
            label: "Search"
        },
        {
            id: 2,
            icon: <AccountCircleOutlinedIcon/>,
            href: "/home/profile",
            label: "Profile"
        },
        {
            id: 3,
            icon: <ExploreOutlinedIcon/>,
            href: "/home/about",
            label: "About"
        },
        {
            id: 4,
            icon: <PlaylistPlayOutlined/>,
            href: "/home/playlist",
            label: "Playlist"
        }
    ]);
    let currPath = window.location.pathname;
    return (
        <div className="bottom-navigation">
            {
                menuItems.map(({id, icon, href, label}) => (
                    <Link className={"bottom-navigation-link"} key={id} to={href}>
                        <Button className={`${currPath === href ? "BottomNavAction active" : "BottomNavAction"}`}
                                    style={{borderRadius: 0}}>
                            {icon}
                        </Button>
                        <span className="label">
                                {
                                    label
                                }
                            </span>
                    </Link>
                ))
            }
        </div>
    );
}

export default BottomNavigationMobile;