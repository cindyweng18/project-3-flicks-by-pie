import { render, fireEvent } from '@testing-library/react';
import Home from 'pages/index';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('toggles title on button click', () => {
    const { getByRole, getByText } = render(<Home />);
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('This is CSC 59939!');

    fireEvent.click(getByText('Click Me To Toggle'));
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('Welcome to Next.js!');

    fireEvent.click(getByText('Click Me To Toggle'));
    expect(getByRole('heading', { level: 1 })).toHaveTextContent('This is CSC 59939!');
  });
});
