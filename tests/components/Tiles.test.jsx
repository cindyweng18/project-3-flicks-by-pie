import { render, fireEvent } from '@testing-library/react';
import Tiles from 'components/Tiles';

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Tiles slidesPerView={2} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
