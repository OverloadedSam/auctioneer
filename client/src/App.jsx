import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './common/RequireAuth';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Auctions from './screens/Auctions';
import CreateAuction from './screens/CreateAuction';
import AuctionDetails from './screens/AuctionDetails';
import Logout from './common/Logout';

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/auction'>
          <Route
            path='create'
            element={
              <RequireAuth>
                <CreateAuction />
              </RequireAuth>
            }
          />
          <Route
            path=':id'
            element={
              <RequireAuth>
                <AuctionDetails />
              </RequireAuth>
            }
          />
        </Route>
        <Route path='/auctions' element={<Auctions />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
