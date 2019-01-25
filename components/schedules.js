import React from "react";

import Program from './program';

export default function Schedules(props) {
  return (
    <div className="schedules">
      {
        props.schedules.map((program, i) =>
          <Program key={i} program={program} now={props.now}/>
        )
      }
    </div>
  );
}