import { useState } from 'preact/hooks'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MainScreen from './pages/mainScreen';
import Parameters from './pages/parameters';
import Basic from './pages/basic';
export function App() {

 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/parameters" element={<Parameters />} />
      <Route path="/basic" element={<Basic />} />
    </Routes>
  </BrowserRouter>
  );
};
