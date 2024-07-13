import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { apiCallsUser } from '../api/calls/user';
import '../assets/css/components/network.css';

const Network = (props) => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [network, setNetwork] = useState([]);

  const getNetwork = async () => {
    const response = await apiCallsUser.User.getNetwork(userId);
    setNetwork(response.data);
  }

  useEffect(() => {
    getNetwork();
  }, [userId]);


  return (
    <Card className='network-container'>
      <CardHeader className='border-0 network-container-header'>
        <h4>Δίκτυο</h4>
      </CardHeader>
      <CardBody className='network-items-container'>
        {
          network.map(user => {
            return (
              <div
                key={user.Id}
                className='user-network-item'
                onClick={() => {
                  navigate(`/index/user/${user.Id}`)
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_LINK}users/uploads/${user.Avatar}`}
                  alt="User Avatar"
                />
                <p to={`/user/${user.Id}`} className='nav-link'>{user.Username}</p>
              </div>
            )
          })
        }
      </CardBody>
    </Card>
  );
}
 
export default Network;