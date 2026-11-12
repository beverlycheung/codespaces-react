import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows campus events and their clubs, themes, and locations', () => {
  render(<App />);
  expect(screen.getAllByText('Clay & Chill').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Ceramics Club').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Arts & culture').length).toBeGreaterThan(0);
  expect(screen.getAllByText('Student Union, Crimson View').length).toBeGreaterThan(0);
});

test('filters the event list by theme and updates the map pins', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Wellness' }));
  expect(screen.getAllByText('Sunset Yoga').length).toBeGreaterThan(0);
  expect(screen.queryByText('Clay & Chill')).toBeNull();
  expect(screen.getByRole('button', { name: /Sunset Yoga, U RecWell/ })).toBeDefined();
});
