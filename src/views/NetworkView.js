import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Table from '../components/Table'
import Network from '../components/Network';
import NetworkTable from '../components/NetworkTable';

const NetworkView = (props) => {
  const userId = localStorage.getItem('userId')
  return (
    <Container className='main-content' fluid>
      <Row>
        <Col xs={3}>
          <Network userId={userId}/>
        </Col>
        <Col xs={9}> 
          <h2>Συνδεδεμένοι Επαγγελματίες</h2>
          <NetworkTable userId={userId}/>
          <Table />
        </Col>
      </Row>
    </Container>
  );
}
 
export default NetworkView;