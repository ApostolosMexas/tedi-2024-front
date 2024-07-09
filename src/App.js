import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Index from './views/Index';
import Auth from './views/Auth';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/index/*" element={<Index />}/>
        <Route path="/auth/*" element={<Auth />}/>
      </Routes>
    </>
  );
};

export default App;
