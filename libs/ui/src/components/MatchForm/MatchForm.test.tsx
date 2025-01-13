import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MatchForm from './MatchForm';

describe('<MatchForm />', () => {
  test('it should mount', () => {
    render(<MatchForm />);

    const matchForm = screen.getByTestId('MatchForm');

    expect(matchForm).toBeInTheDocument();
  });
});