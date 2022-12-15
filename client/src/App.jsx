import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Register from './screens/Register';
import Logout from './common/Logout';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
