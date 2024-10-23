import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {AuthProvider} from "./context/AuthContext";

test('renders login page', () => {
  render(<AuthProvider><App /></AuthProvider>);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
