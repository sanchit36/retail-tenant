import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Details, Home } from '../screens';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/property/:id" element={<Details />} />
    </Routes>
  );
};

export default Router;
