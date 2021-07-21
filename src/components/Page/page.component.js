import { Component } from "react";
import * as React from 'react';
import Button from "../button/button.component";
import ProgressBar from "../progress_bar/progress_bar.component";
import './page.component.scss';

class Page extends Component {
  state = {
    isLoading: false,
    percentLoaded: 0,
    progressBarVisible: true
  };

  intervalId;

  handleFinishRequest = () => {
    clearInterval(this.intervalId);
    this.setState({
      isLoading: false,
      percentLoaded: 100
    }, () => setTimeout(() => {
      this.setState({
        ...this.state,
        progressBarVisible: false
      }, () => setTimeout(() => {
        // TODO: this should be refactored, the purpose is so that
        // if the request is restarted we will not see the bar re-setting
        // from 100 to 0.
        this.setState({
          ...this.state,
          percentLoaded: 0
        });

      }, 3000));
    }, 3000));
  };

  handleStall = () => {
    clearInterval(this.intervalId);
    this.setState({
      isLoading: true,
      percentLoaded: 90
    });
  }

  handleUpdatePercentLoaded = (secondsElapsed) => {
    let percentLoaded = Math.floor((secondsElapsed * 100) / 15);
    this.setState({
      isLoading: true,
      percentLoaded: percentLoaded > 90 ? 90 : percentLoaded
    });
  };

  handleStartLoading = () => {
    this.setState({
      ...this.state,
      isLoading: true,
      progressBarVisible: true
    });
  };

  getSecondsElapsed = () => {
    let percentLoaded = this.state.percentLoaded;
    if (percentLoaded >= 100) return 0;
    return Math.floor((percentLoaded * 15) / 100)
  }

  handleStartRequest = () => {
    this.handleStartLoading();

    let secondsElapsed = this.getSecondsElapsed();

    this.intervalId = setInterval(() => {
      if (secondsElapsed >= 14) return this.handleStall();
      this.handleUpdatePercentLoaded(++secondsElapsed);
    }, 1000);
  };

  handlePauseRequest = () => {
    clearInterval(this.intervalId);
    this.setState({
      ...this.state,
      isLoading: false
    });
  }

  render() {
    const classes = this.state.progressBarVisible ? 'progress-bar' : 'progress-bar hide'
    return (
      <div className='loading-bar-exercise'>
        <div className="button-controls">
          <Button
            className="start-request-button"
            onClick={this.handleStartRequest}
            disabled={this.state.isLoading}>
            {this.state.isLoading ? 'Loading...' : this.state.percentLoaded !== 0 && this.state.percentLoaded !== 100 ? 'Resume Request' : 'Start Request'}
          </Button>
          <Button
            className="pause-request-button"
            onClick={this.handlePauseRequest}
            disabled={!this.state.isLoading}>
            Pause Request
          </Button>
          <Button
            className="finish-request-button"
            onClick={this.handleFinishRequest}
            disabled={!this.state.isLoading}>
            Finish Request
          </Button>
        </div>
        <div className="basket">
          <ProgressBar percentLoaded={this.state.percentLoaded} className={classes} />
        </div>
      </div>
    );
  };
};

export default Page;