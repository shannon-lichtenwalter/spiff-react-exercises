import React from 'react'
import ReactDOM from 'react-dom'
import ProgressBar from './progress_bar.component.js'

describe('ProgressBar Component', () => {
  it('Renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
