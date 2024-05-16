import React from 'react';
import { render, screen } from '@testing-library/react';
import MainContentHeader from './MainContentHeader';

test('renders MainContentHeader component with title', () => {
  const title = 'Main Content Title';
  render(<MainContentHeader title={title} />);

  // Verifica que el título se renderice correctamente
  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();

  // Verifica que el título tenga las clases CSS adecuadas
  expect(titleElement).toHaveClass('text-2xl font-semibold whitespace-nowrap text-gray-900');
});

test('renders MainContentHeader component without title', () => {
  render(<MainContentHeader />);

  // Verifica que no haya ningún título renderizado
  const titleElement = screen.queryByText(/Main Content Title/i);
  expect(titleElement).not.toBeInTheDocument();
});