import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Show from './components/pages/Show';
import Createbook from './components/pages/Createbook';
import Editbook from './components/pages/Editbook';
import Deletebook from './components/pages/Deletebook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<Createbook />} />
      <Route path='/books/:id' element={<Show />} /> 
      <Route path='/books/edit/:id' element={<Editbook />} />
      <Route path='/books/delete/:id' element={<Deletebook />} />
    </Routes>
  );
};

export default App;
