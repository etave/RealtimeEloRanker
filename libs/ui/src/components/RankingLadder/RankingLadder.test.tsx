import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RankingLadder from './RankingLadder';

describe('<RankingLadder />', () => {
  test('it should mount', () => {
    render(<RankingLadder />);

    const rankingLadder = screen.getByTestId('RankingLadder');

    expect(rankingLadder).toBeInTheDocument();
  });
});