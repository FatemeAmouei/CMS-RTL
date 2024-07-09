import React from 'react';
import './App.css';
import '../src/CSS/reset.css';
import '../src/CSS/style-1.css';
import { Routes, Route, useRoutes } from "react-router-dom";
import NavbarRTL from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import routes from './routes';
import { ThemeProvider } from './Context/ThemeContext';

function App() {
  const router = useRoutes(routes);

  return (
    <ThemeProvider>
      <Sidebar />
      <div className='main'>
        <NavbarRTL />
        {router} 
      </div>
    </ThemeProvider>
  );
}

export default App;
