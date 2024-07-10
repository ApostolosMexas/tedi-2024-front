import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import Network from '../components/Network';

const Home = (props) => {

  return (
    <Container className='main-content'>
      <Row>
        <Col xs={3}>
          <Network />
        </Col>
        <Col>
          Timeline
        </Col>
      </Row>
    </Container>
  );
}
 
export default Home;