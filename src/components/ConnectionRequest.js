import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import '../assets/css/components/connectionRequest.css';
import { apiCallsUser } from '../api/calls/user';

const ConnectionRequest = ({ request }) => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);


  const handleAccept = async () => {
    const response = await apiCallsUser.User.updateConnectionRequest(
      request.Connection.Id,
      {
        Status: 'active',
      }
    );
    const data = response.data;
    if (data) {
      setAccepted(!accepted);
    }
  };

  return (
    <div
      className='pending-connection-container'
    >
      <img
        src={`${process.env.REACT_APP_API_LINK}users/uploads/${request.User.Avatar}`}
        alt="User Avatar"
        onClick={() => navigate(`/index/user/${request.User.Id}`)}
      />
      <h6  
        onClick={() => navigate(`/index/user/${request.User.Id}`)}
      >
        {request.User.Username}
      </h6>
      <Button
        className='accept-connection'
        onClick={() => handleAccept()}
        disabled={accepted}
      >
        {accepted ? 'Έγινε Αποδοχή' : 'Αποδοχή'}
      </Button>
    </div>
  );
}
 
export default ConnectionRequest;