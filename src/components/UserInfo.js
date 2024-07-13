import React, { useEffect, useState } from 'react';
import { apiCallsUser } from '../api/calls/user';
import { Col, Container, Row,Card, CardBody, CardHeader } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Network from './Network';

const UserDetails = () => {
  const { id } = useParams(); // Use useParams to get the userId from the URL
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await apiCallsUser.User.getUser(id);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    fetchUserDetails();
  }, [id]);

  return (
    <Container className='main-content' fluid>
      <Row>
        <Col xs={3}>
          <Network />
        </Col>
        <Col xs={9}>
        <Card className='network-container'>
        <CardHeader className='border-0 network-container-header'>
            <h4>Προσωπικά Στοιχεία</h4>
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
        {userDetails && console.log(userDetails)}
        </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
