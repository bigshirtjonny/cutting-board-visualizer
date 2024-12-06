import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectEditor from './views/ProjectEditor';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProjectEditor />}  />
    </Routes>
  );
};

export default App;
