import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import AuthImage from './AuthImage';
import { apiCallsUser } from '../api/calls/user';

const Network = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [network, setNetwork] = useState([]);

  const getNetwork = async () => {
    const response = await apiCallsUser.User.getNetwork(userId);
    setNetwork(response.data);
  }

  useEffect(() => {
    getNetwork();
  }, [userId]);


  return (
    <Card style={{margin: '20px'}}>
      <CardHeader>
        Δίκτυο
      </CardHeader>
      <CardBody>
        {
          network.map(user => {
            console.log(user)
            return (
              <div key={user.Id}>
                <AuthImage
                  src={`${process.env.REACT_APP_API_LINK}users/uploads/${user.Avatar}`}
                  alt="User Avatar"
                  height="40px"
                  width="40px"
                />
                <p>{user.Username}</p>
              </div>
            )
          })
        }
      </CardBody>
    </Card>
  );
}
 
export default Network;