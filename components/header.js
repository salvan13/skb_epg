import React from "react";

import logo from '../assets/images/logo.png';

export default function Header(props) {
  return (
    <header>
      <h1>
        <img src={logo} alt="Norigin Media Logo"></img>
      </h1>
    </header>
  );
}