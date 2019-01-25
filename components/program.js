import React from "react";

import * as time from '../libs/time';

export default function Program(props) {
  const program = props.program;
  const length = program.end - program.start;
  const isNow = program.start < props.now && program.end >= props.now;

  return (
    <a href="#"
      onClick={e => e.preventDefault() }
      className={`program ${isNow ? 'now' : ''}`}
      style={{'--length': length}}>
        <span>{program.title}</span>
        <span>{time.formatTime(program.start)} - {time.formatTime(program.end)}</span>
    </a>
  );
}