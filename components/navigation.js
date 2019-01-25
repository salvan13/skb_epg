import React from "react";

export default function Navigation(props) {
  return (
    <nav>
      <ul>
        <li>
          <a href="#" onClick={e => e.preventDefault()}>EPG</a>
        </li>
      </ul>
    </nav>
  );
}