import { Component } from "react";
import * as React from 'react';
import Button from "../button/button.component";
import ProgressBar from "../progress_bar/progress_bar.component";
import './page.component.scss';
import ProgressBar2 from "../progress_bar_2/progress_bar_2.component";

class Page extends Component {
  state = {
    isLoading: false,
    percentLoaded: 0,
    progressBarVisible: true,
    breakpoints: "",
    validatedBreakpoints: [0],
    normalBar: true
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

  handleSubmit = (e) => {
    e.preventDefault();
    let breakpoints = this.state.breakpoints;
    let validatedBreakpoints = breakpoints
      .split(",")
      .map(points => Number(points.trim()))
      .sort((a, b) => a - b)
      .filter(num => num >= 0 && num <= 100);

    this.setState({
      ...this.state,
      validatedBreakpoints: validatedBreakpoints.length === 0 ? [0] : validatedBreakpoints,
      breakpoints: ""
    });
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      breakpoints: event.target.value
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

        <div className="toggle-option">
          <Button
            className="toggle-bar"
            onClick={() => this.setState({ ...this.state, normalBar: !this.state.normalBar })}>
            Toggle Bar
          </Button>
        </div>

        {this.state.normalBar &&
          <div>
            <ProgressBar percentLoaded={this.state.percentLoaded} className={classes} />
          </div>
        }

        {!this.state.normalBar &&
          <div className="breakpoints-bar">
            <div>
              <ProgressBar2 percentLoaded={this.state.percentLoaded} breakpoints={this.state.validatedBreakpoints} className={classes} />
            </div>
            <form onSubmit={this.handleSubmit} className="set-breakpoints-input">
              <label>
                Select Breakpoints:
              </label>
              <input
                type="text"
                placeholder="please enter numbers separated by comma"
                value={this.state.breakpoints}
                onChange={this.handleChange} />
              <Button
                type="submit"
                value="Submit"
                className="submit-request-button">
                Submit
              </Button>
            </form>
          </div>
        }

      </div>
    );
  };
};

export default Page;