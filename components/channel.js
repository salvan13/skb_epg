import React from "react";

import Logo from './logo';
import Schedules from './schedules';

import * as channels from '../libs/channels';

export default class Channel extends React.Component {

  shouldComponentUpdate(nextProps) {
    // update the component only when the actual program changes
    const actual = channels.getActualProgram(this.props.now, this.props.channel.schedules);
    const next = channels.getActualProgram(nextProps.now, this.props.channel.schedules);
    if(actual && next) {
      return actual.start !== next.start; // should use the propgram id, but they are not unique
    }
    return false;
  }

  render() {
    const channel = this.props.channel;
    return (
      <div className="row" style={{'--start-offset': this.props.offset}}>
        <Logo src={channel.images.logo} alt={channel.title} />
        <Schedules schedules={channel.schedules} now={this.props.now}></Schedules>
      </div>
    );
  }
}