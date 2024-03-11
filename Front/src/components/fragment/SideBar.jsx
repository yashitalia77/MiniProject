import React, {useContext} from "react";
import "../assets/scss/SideBar.scss";
import SideBarOptions from "./SideBarOptions";
import Playlist from "./Playlist";
import {ThemeContext} from "../../api/Theme";
import {ExploreOutlined, HomeOutlined,PlaylistPlayOutlined, SearchOutlined} from "@material-ui/icons";

function SideBar() {
    const useStyle = useContext(ThemeContext);
    return (
        <aside style={useStyle.component} className={"aside-bar"}>
            <div className="aside-bar-container">
                <p className={"p1"}>
                    <span>LIBRARY</span>
                </p>
                <SideBarOptions className={"lib-sub"} Icon={HomeOutlined} href={"/home"} title={"Home"} />
                <SideBarOptions className={"lib-sub"} Icon={ExploreOutlined} href={"/home/about"}  title={"About"}/>
                <SideBarOptions className={"lib-sub"} Icon={SearchOutlined} href={"/home/search"}  title={"Search"}/>
                <SideBarOptions className={"lib-sub"} Icon={PlaylistPlayOutlined} href={"/home/playlist"}  title={"Playlist"}/>
            </div>
        </aside>
    );
}

/*
*
* */
export default SideBar;