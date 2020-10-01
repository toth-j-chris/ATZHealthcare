import React from "react";
import "./css/navbar.css";

function Navbar() {
    return (
        <div>
            <ul className="navinator">
                <li className="navElement">
                    <a href="/dashboard">ATZ Healthcare</a>
                </li>
                <li className="navElement">
                    <a href="/dashboard">Home</a>
                </li>
                <li style={{ float: "right" }}>
                    <a
                        className="active"
                        href="/dashboard">
                        Schedule An Appointment
            </a>
                </li>
                <li className="navElement" style={{ float: "right" }}>
                    <a href="/login">Logout</a>
                </li>
            </ul>
        </div>
    );

} //class

export default Navbar;