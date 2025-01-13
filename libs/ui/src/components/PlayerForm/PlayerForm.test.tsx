import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerForm from './PlayerForm';

describe('<PlayerForm />', () => {
  test('it should mount', () => {
    render(<PlayerForm />);

    const playerForm = screen.getByTestId('PlayerForm');

    expect(playerForm).toBeInTheDocument();
  });
});