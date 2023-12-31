import React from "react";

import ChotiLogo from "./logo_choti.png";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="Footer">
            <a
                href="https://github.com/jgchoti/dictionary-react"
                target="_blank"
                rel="noopener noreferrer"
            >
                Open-Source Code
            </a>
            , by{" "}
            <a
                href="https://choti-portfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={ChotiLogo} alt="logo" className="logo" />
            </a>
        </div>
    );
}
