import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../redux/slices/authSlice';
import { Navigate, Route, Routes, NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from './Home';
import NetworkView from './NetworkView';
import "../assets/css/index.css";
import Admin from "../views/Admin";
import Chats from './Chats';
import Settings from './Settings';
import Notifications from './Notifications';
import UserInfo from '../views/UserInfo';

const Index = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('tedi-token');
  const [userRoleId, setUserRoleID] = useState('');

  useEffect(() => {
    if (token == null) {
      navigate('/auth/');
    }
    setUserRoleID(localStorage.getItem("userRole"));
  }, [token, navigate]);

  return (
    <Container className='index-container' fluid>
      <div className='top-navbar'>
        <div className='nav-container'>
          <h3>LockedIn</h3>
          <div className='nav'>
            {userRoleId === 'c20d8929-fc91-4e48-92a0-bb3b3fff55e1' &&
            <>
              <NavLink to="/index/home" className='nav-link'>Αρχική</NavLink>
              <NavLink to="/index/network" className='nav-link'>Δίκτυο</NavLink>
              <NavLink to="/index/offers" className='nav-link'>Αγγελίες</NavLink>
              <NavLink to="/index/chats" className='nav-link'>Συζητήσεις</NavLink>
              <NavLink to="/index/notifications" className='nav-link'>Ειδοποιήσεις</NavLink>
              <NavLink to="/index/personal" className='nav-link'>Προσωπικά Στοιχεία</NavLink>
              <NavLink to="/index/settings" className='nav-link'>Ρυθμίσεις</NavLink>
            </>
            }
            {userRoleId === '1f79b81e-f067-4ea0-854f-3c9490b498eb' &&
            <>
              <NavLink to="/index/admin" className='nav-link'>Χρήστες</NavLink>
              <NavLink to="/index/personal" className='nav-link'>Προσωπικά Στοιχεία</NavLink>
              <NavLink to="/index/settings" className='nav-link'>Ρυθμίσεις</NavLink>
            </>
            }
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
        <Route path='/chats' element={<Chats />}>
          <Route path=':connectionId' element={<Chats />} />
        </Route>
        <Route path='/user'>
          <Route path=':id' element={<UserInfo />} />
        </Route>
        {/* <Route path='/user/:id' element={<UserInfo />} /> */}
        <Route path="/notifications" element={<Notifications />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path='*' element={<Navigate to="/index/home" replace />} />
      </Routes>
    </Container>
  );
}
 
export default Index;