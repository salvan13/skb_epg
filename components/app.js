import React from "react";

import Header from './header';
import Navigation from './navigation';
import Epg from './epg';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo({x, y}) {
    if(Number.isFinite(x)) {
      this.mainRef.current.scrollTop = x;
    }
    if(Number.isFinite(y)) {
      this.mainRef.current.scrollLeft = y;
    }
  }

  render() {
    const currentSection = <Epg onScroll={this.scrollTo} />;
    return (
      <React.Fragment>
        <Header />
        <main ref={this.mainRef}>
          {currentSection}
        </main>
        <Navigation />
      </React.Fragment>
    );
  }
}