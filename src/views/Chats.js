import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import ChatSidebar from '../components/ChatSidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Chat from '../components/Chat';

const Chats = ({}) => {

  return (
    <Container className='main-content' fluid>
      <Row>
        <Col xs={3}>
          <ChatSidebar />
        </Col>
        <Col xs={9}>
          <Routes>
            <Route path=':id' element={<Chat />} />
            <Route
              path="/"
              element={
                <div className='timeline-container'>
                  <h2>Επιλέξτε μια Συζήτηση</h2>
                </div>
              }
            />
            <Route
              path='*'
              element={<Navigate to="/index/chats/" replace />} 
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
 
export default Chats;