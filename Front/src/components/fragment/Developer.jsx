import React from 'react';
import '../assets/scss/Developer.scss';
import { IconButton } from "@material-ui/core";
import AvatarImage from "../assets/img/avatar.jpg";
import { Facebook, Instagram, LinkedIn, Portrait, Twitter } from "@material-ui/icons";

const Developer = () => {
    return (
        <div className={"Developer"}>
            <h3 className={"Developer-head"}>Meet the developer</h3>
            <div className="Developer-profile">
                <div className="Developer-profileCard">
                    <img src={AvatarImage} alt="Profile" />
                    <div className={"Card-details"}>
                        <h3>Yash Italiya</h3>
                        <p>Full Stack developer</p>
                        <p>Competitive Coder</p>
                    </div>
                </div>
                <div className="Developer-profileDetails">
                    <p>A Computer Science and Engineering Student at DDU University, Nadiad.</p>
                    <p>Graduating in 2025 and looking for a responsible position to gain practical knowledge</p>
                    <p>A full-stack web developer and a Competitive coder.</p>
                    <p>I love designing fully responsive websites.</p>
                    <p>I have a keen interest in developing projects, whenever I want to learn something new.</p>

                    <div className="Card-btn">
                        <IconButton target={"_blank"} href={"https://www.facebook.com/yash.italiya"} title={"yash.italiya"}>
                            <Facebook />
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://twitter.com/Yash_italiya"} title={"Yash_italiya"}>
                            <Twitter />
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.linkedin.com/in/yashitaliya/"} title={"yashitaliya"}>
                            <LinkedIn />
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://www.instagram.com/yashitaliya/"} title={"yashitaliya"}>
                            <Instagram />
                        </IconButton>
                        <IconButton target={"_blank"} href={"https://yashitaliya.com/"} title={"Web Portfolio"}>
                            <Portrait />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Developer;
