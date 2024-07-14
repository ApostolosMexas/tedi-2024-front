import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Network from '../components/Network';
import Timeline from '../components/Timeline';

const Home = (props) => {
  const userId = localStorage.getItem('userId');

  return (
    <Container className='main-content' fluid>
      <Row>
        <Col xs={3}>
          <Network userId={userId}/>
        </Col>
        <Col xs={9}>
          <Timeline />
        </Col>
      </Row>
    </Container>
  );
}
 
export default Home;