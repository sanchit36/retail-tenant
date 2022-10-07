import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Details, Home } from '../screens';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home isSearch={false} />} />
      <Route path="/search" element={<Home isSearch />} />
      <Route path="/property/:id" element={<Details />} />
    </Routes>
  );
};

export default Router;
