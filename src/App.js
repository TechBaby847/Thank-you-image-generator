import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './components/pages/Home';
import Card from './components/pages/Card';
import "./style.css";

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/card" element={<Card />} />
        </Routes>
      </BrowserRouter>
    );
};

export default App;