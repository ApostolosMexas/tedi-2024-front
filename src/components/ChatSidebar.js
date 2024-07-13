import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { apiCallsUser } from '../api/calls/user';
import '../assets/css/components/chatSidebar.css';

const ChatSidebar = ({}) => {
  const { connectionId } = useParams();
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const response = await apiCallsUser.User.getChats(userId);
    setChats(response.data);
  };

  useEffect(() => {
    getChats();
  }, [userId]);

  return (
    <Card className='chat-sidebar-container'>
      <CardHeader className='border-0 chat-sidebar-container-header'>
        <h4>Συζητήσεις</h4>
      </CardHeader>
      <CardBody className='chat-sidebar-items-container'>
        {
          chats.map(chat => {
            return (
              <div
                key={chat.Connection.Id}
                className={`user-chat-sidebar-item${connectionId !== chat.Connection.Id ? '' : '-selected'}`}
                onClick={() => {
                  if (connectionId !== chat.Connection.Id) {
                    navigate(`/index/chats/${chat.Connection.Id}`);
                  }
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API_LINK}users/uploads/${chat.User.Avatar}`}
                  alt="User Avatar"
                />
                {
                  chat.LastDirectMessage
                  ? (
                    <div className='message-preview-container'>
                      <h6>{chat.User.Username}</h6>
                      <p className='message-preview'>
                        {
                          chat.User.Id === userId ? 'Εσείς: ' : `${chat.User.Username}: `}{chat.LastDirectMessage.DirectMessage.Data
                        }
                      </p>
                    </div>
                  )
                  : (
                    <h6>{chat.User.Username}</h6>
                  )
                }
              </div>
            )
          })
        }
      </CardBody>
    </Card>
  );
}
 
export default ChatSidebar;