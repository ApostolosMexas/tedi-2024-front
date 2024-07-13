import React from 'react';
import '../assets/css/components/directMessage.css';

const DirectMessage = ({ directMessage }) => {
  const userId = localStorage.getItem('userId');;

  return (
    <div className={`dm-container-${userId === directMessage.Sender.Id ? 'sent' : 'received'}`}>
      <img
        src={`${process.env.REACT_APP_API_LINK}users/uploads/${directMessage.Sender.Avatar}`}
        alt="User Avatar"
      />
      <div className='dm-bubble'>
        <p>{directMessage.DirectMessage.Data}</p>
      </div>
    </div>
  );
};
 
export default DirectMessage;