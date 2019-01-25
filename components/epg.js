import React from "react";

import Channel from './channel';
import Timeline from './timeline';

import * as api from '../libs/api';
import * as channels from '../libs/channels';

export default class Epg extends React.Component {

  constructor(props) {
    super(props);
    this.scrollToNow = this.scrollToNow.bind(this);
    this.interval;
    this.nowIndicatorRef = React.createRef();
    this.state = {
      loading: true,
      error: null,
      channels: [],
      start: 0,
      end: 0,
      now: Date.now()
    };
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    
    api.getEpg().then(list => this.setState({
      loading: false,
      channels: list,
      start: channels.getFirstProgramStartTime(list),
      end: channels.getLastProgramEndTime(list)
    })).catch(error => {
      console.error(error);
      this.setState({
        error
      });
    });

    this.interval = setInterval(() => {
      this.setState({
        now: Date.now()
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scrollToNow() {
    const transformMatrix = getComputedStyle(this.nowIndicatorRef.current).transform;
    const y = parseInt(transformMatrix.split(',')[4].trim(), 10) - window.innerWidth / 2;
    this.props.onScroll({y});
  }

  render() {
    let content;
    if(this.state.error) {
      content = <div className="error">{this.state.error.message}</div>
    } else if(this.state.loading) {
      content = <div className="loading"></div>
    } else {
      content = 
      <React.Fragment>
        <Timeline start={this.state.start} end={this.state.end} />
        {
          this.state.channels.map(channel => {
            const offset = channel.schedules[0].start - this.state.start;
            return <Channel
              key={channel.id}
              channel={channel}
              offset={offset}
              now={this.state.now}
            ></Channel>
          })
        }
        <div  className="now-indicator"
          ref={this.nowIndicatorRef}
          style={{'--now': this.state.now - this.state.start}}>
        </div>
        <button className="now-button" onClick={this.scrollToNow}>NOW</button>
      </React.Fragment>
    }
    
    return (
      <section className="epg" style={{
        '--length': this.state.end - this.state.start
      }}>
        {content}
      </section>
    );
  }
}