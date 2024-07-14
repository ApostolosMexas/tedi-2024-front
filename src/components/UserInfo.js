import React, { useEffect, useState } from 'react';
import { apiCallsUser } from '../api/calls/user';
import { Col, Container, Row,Card, CardBody, CardHeader, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Network from './Network';
import '../assets/css/components/userInfo.css';

const UserDetails = () => {
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const [userDetails, setUserDetails] = useState(null);
  const [connectionRequest, setConnectionRequest] = useState(false);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await apiCallsUser.User.getUser(id);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    async function fetchUserConnections() {
      try {
        const response = await apiCallsUser.User.getConnectionRequests(id, 'active');
        const data = response.data;
        if (data.some(connection => connection.User.Id === userId)) {
          setConnectionRequest(true);
        }
      } catch (error) {
        console.error('Error fetching user connections:', error);
      }
    }
    fetchUserDetails();
    fetchUserConnections();
  }, [id]);

  const handleConnectionRequest = async () => {
    const response = await apiCallsUser.User.createConnectionRequest({
      UserId_A: userId,
      UserId_B: id,
      Status: 'pending'
    });
    const data = response.data;
    if (data) {
      setConnectionRequest(true);
    }
  };

  return (
    <Container className='main-content' fluid>
      <Row>
        <Col xs={3}>
          <Network userId={id}/>
        </Col>
        <Col xs={9}>
        <Card className='network-container'>
        <CardHeader className='border-0 network-container-header'>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h4>Προσωπικά Στοιχεία</h4>
            {
              id !== userId && (
                <Button
                  className='connection-request'
                  onClick={() => handleConnectionRequest()}
                  disabled={connectionRequest}
                >
                  {!connectionRequest ? 'Αίτημα Σύνδεσης' : 'Έγινε Αίτημα Σύνδεσης'}
                </Button>
              )
            }
          </div>
        </CardHeader>
        <CardBody className='network-items-container'>
        {userDetails &&
        <>
            <div>
                <label>
                    Όνομα
                    <input type="text" readOnly value={userDetails?.Name || ''} />
                </label>
            </div>
            <div>
                <label>
                    Επώνυμο
                    <input type="text" readOnly value={userDetails?.Surname || ''} />
                </label>
            </div>
            <div>
                <label>
                    Email
                    <input type="text" readOnly value={userDetails?.Email || ''} />
                </label>
            </div>
            <div>
                <label>
                    Τηλέφωνο
                    <input type="text" readOnly value={userDetails?.Phone || ''} />
                </label>
            </div>
            <div>
                <label>
                    Επαγγελματική Θέση
                    <input type="text" readOnly value={userDetails?.Position || ''} />
                </label>
            </div>
            <div>
                <label>
                    Φορέας Απασχόλησης
                    <input type="text" readOnly value={userDetails?.Company || ''} />
                </label>
            </div>
         </>
        }
        </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
