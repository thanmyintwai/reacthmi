import { useState } from 'preact/hooks'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'


import Home from './pages/home';
import MainScreen from './pages/mainScreen';
import Parameters from './pages/parameters';
import Basic from './pages/basic';
import Settings from './pages/settings';
import Middle  from './pages/middle';


const queryClient = new QueryClient()


export function App() {

 
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/parameters" element={<Parameters />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/basic" element={<Basic />} />
      <Route path="/middle" element={<Middle />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  );
};
