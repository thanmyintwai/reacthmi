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


const queryClient = new QueryClient()


export function App() {

 
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/parameters" element={<Parameters />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/basic" element={<Basic />} />
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
  );
};
