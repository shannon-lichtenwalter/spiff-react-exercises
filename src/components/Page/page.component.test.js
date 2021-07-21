import React from 'react'
import ReactDOM from 'react-dom'
import Page from './page.component.js'

describe('Page Component', () => {
  it('Renders without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Page />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
