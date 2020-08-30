/** @jsx jsx */
import { create } from 'react-test-renderer';
import { jsx } from '@emotion/core';

import App from 'App';
import ThemeProvider from 'hooks/Theme';

describe('App', () => {
  it('renders correctly', () => {
    const tree = create(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
