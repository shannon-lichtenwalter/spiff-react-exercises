import { Component } from "react";
import * as React from 'react';
import './progress_bar2.component.scss';

class ProgressBar2 extends Component {

  getSpeed = (percentLoaded) => {
    const breakpoints = this.props.breakpoints ? this.props.breakpoints : [0, 100];
    for (let i = 0; i < breakpoints.length; i++) {
      let lowerBoundary = breakpoints[i];
      let upperBoundary = breakpoints[i + 1] ? breakpoints[i + 1] : 100;
      if (percentLoaded >= lowerBoundary && percentLoaded <= upperBoundary) return 1;
      i++;
    }
    return 5;
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="container">
          <div className="filler" style={{ width: this.props.percentLoaded + '%', transition: `width ${this.getSpeed(this.props.percentLoaded)}s linear` }}></div>
        </div>
      </div>
    );
  };
}

export default ProgressBar2