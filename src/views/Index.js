import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/slices/authSlice';
import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from './Home';
import NetworkView from './NetworkView';
import User from '../components/User';
import "../assets/css/index.css";

const Index = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('tedi-token');

  useEffect(() => {
    if (token == null) {
      navigate('/auth/');
    }
  }, [token, navigate]);

  return (
    <Container className='index-container' fluid>
      <div className='top-navbar'>
        <div className='nav-container'>
          <h3>LinkedIn</h3>
          <div className='nav'>
            <NavLink to="/index/home" className='nav-link'>Αρχική</NavLink>
            <NavLink to="/index/network" className='nav-link'>Δίκτυο</NavLink>
            <NavLink to="/index/offers" className='nav-link'>Αγγελίες</NavLink>
            <NavLink to="/index/chats" className='nav-link'>Συζητήσεις</NavLink>
            <NavLink to="/index/notifications" className='nav-link'>Ειδοποιήσεις</NavLink>
            <NavLink to="/index/personal" className='nav-link'>Προσωπικά Στοιχεία</NavLink>
            <NavLink to="/index/settings" className='nav-link'>Ρυθμίσεις</NavLink>
          </div>
        </div>
        <h6 onClick={() => {
          dispatch(logoutSuccess())
          navigate('/auth/');
        }}>Έξοδος</h6>
      </div>
      <Routes>
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/network' element={<NetworkView />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='*' element={<Navigate to="/index/home" replace />} />
      </Routes>
    </Container>
  );
}
 
export default Index;