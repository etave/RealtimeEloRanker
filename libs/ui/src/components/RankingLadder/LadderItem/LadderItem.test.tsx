import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LadderItem from './LadderItem';

describe('<LadderItem />', () => {
  test('it should mount', () => {
    render(<LadderItem />);

    const ladderItem = screen.getByTestId('LadderItem');

    expect(ladderItem).toBeInTheDocument();
  });
});