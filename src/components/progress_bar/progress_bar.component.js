import { Component } from "react";
import * as React from 'react';
import './progress_bar.component.scss';

class ProgressBar extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="container">
          <div className="filler" style={{ width: this.props.percentLoaded + '%' }}></div>
        </div>
      </div>
    );
  };
};

export default ProgressBar