import React from 'react'
import ReactDOM from 'react-dom'
import Button from './button.component.js'

describe('Button Component', () => {
  it('Renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
