import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Auth from './views/Auth';
import Admin from './views/Admin';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/index/*" element={<Index />}/>
        <Route path="/auth/*" element={<Auth />}/>
        <Route path="/admin/" element={<Admin />}/>
      </Routes>
    </>
  );
};

export default App;
