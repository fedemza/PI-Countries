import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
///////


import { Provider } from 'react-redux';
//import Home from './components/Home';
import store from './store';
import React from "react";
import { MemoryRouter } from "react-router-dom";
//import Detail from './components/Detail';

//import axios from 'axios';
import LandingPage from './components/LandingPage';
import ActivityCreate from './components/ActivityCreate';

test('Landing Page has a button Ingresar', () => {
  render(
    <MemoryRouter>
      <LandingPage/>
    </MemoryRouter>
  );
 
  const linkElement = screen.getByText("Ingresar");
  expect(linkElement).toBeInTheDocument();
});



