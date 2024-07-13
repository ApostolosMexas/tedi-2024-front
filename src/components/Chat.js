import React, { useEffect, useState, useRef } from 'react';
import { apiCallsUser } from '../api/calls/user';
import { apiCallsData } from '../api/calls/data';
import '../assets/css/components/chat.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DirectMessage from './DirectMessage';
import { Input, Button } from 'reactstrap';

const Chat = ({}) => {
  const { connectionId } = useParams();
  const userId = useSelector(state => state.auth.userId);
  const [chat, setChat] = useState({});
  const [newMessageText, setNewMessageText] = useState('');
  const divRef = useRef(null);
  const navigate = useNavigate();

  const fetchChat = async () => {
    const response = await apiCallsUser.User.getChat(userId, connectionId);
    setChat(response.data);
  };

  useEffect(() => {
    fetchChat();
  }, [userId, connectionId]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSendMessage = async () => {
    const response = await apiCallsData.Data.sendMessage({
        Sender: userId,
        Receiver: chat.User.Id,
        Data: newMessageText,
        ConnectionId: connectionId,
    });
    const newMessage = response.data;
    setChat({
      ...chat,
      DirectMessages: [
        ...chat.DirectMessages,
        newMessage,
      ],
    });
    setNewMessageText('');
  };

  return (
    <div className='chat-container'>
      <div className='chatter-info'>
        {
          chat.User && (
            <img
              src={`${process.env.REACT_APP_API_LINK}users/uploads/${chat.User.Avatar}`}
              alt="User Avatar"
              onClick={() => navigate(`/index/user/${chat.User.Id}`)}
            />
          )
        }
        <h2 onClick={() => navigate(`/index/user/${chat.User?.Id}`)}>{chat.User?.Username ?? ''}</h2>
      </div>

      {
        chat.DirectMessages && chat.DirectMessages.length > 0
        ? (
          <div
            className='dms-container'
            ref={divRef}
          >
            {
              chat.DirectMessages && chat.DirectMessages.map(dm => {
                console.log(dm)
                return (
                  <DirectMessage
                    key={dm.DirectMessage.Id}
                    directMessage={dm}
                  />
                )
              })
            }
          </div>
        ) : (
          <div className='empty-chat'>
            <p>Δεν υπάρχει ιστορικό συνομιλίας.</p>
          </div>
        )
      }

      <div className='dm-input-container'>
        <Input
          type='textarea'
          style={{
            minHeight: '60px',
            maxHeight: '60px'
          }}
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
        />
        <Button
          className='dm-send'
          disabled={newMessageText.trim() === ''}
          onClick={() => handleSendMessage()}
        >
          Αποστολή
        </Button>
      </div>
    </div>
  );
}
 
export default Chat;