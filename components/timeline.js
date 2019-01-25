import React from "react";

import * as time from '../libs/time';

export default function Timeline(props) {
 
  const hours = parseInt((props.end - props.start) / 1000 / 60 / 60, 10);
  const times = [];
  for(let x = 0; x <= hours; x++) {
    times.push(time.formatTime(new Date(props.start + (x * 1000 * 60 * 60))));
  }

  return (
    <div className="timeline">
      {times.map((t, i) => <div className="hour" key={i}>
        <span>{t}</span>
      </div>)}
    </div>
  );
}