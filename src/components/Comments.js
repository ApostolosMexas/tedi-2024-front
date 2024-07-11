import React, { useState } from 'react';
import '../assets/css/components/comments.css';
import { Button, Input } from 'reactstrap';

const Comments = ({ comments, handleComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    handleComment(commentText);
    setCommentText('');
  };

  return (
    <div className='comments-container'>
      <h5>Σχόλια</h5>
      {
        comments.map(comment => {
          const date = new Date(comment?.Comment?.CreatedAt).toLocaleDateString("el-GR") ?? '';
          const time = new Date(comment?.Comment?.CreatedAt).toLocaleTimeString("el-GR") ?? '';
          const displayedDateTime = `${date !== "Invalid Date" ? date : ''} ${time !== "Invalid Date" ? time : ''}`;
          return (
            <div className='comment'>
              <div className='comment-info'>
                <div className='user-comment-item'>
                  <img
                    src={`${process.env.REACT_APP_API_LINK}users/uploads/${comment.Commenter.Avatar}`}
                    alt="User Avatar"
                  />
                  <h6>{comment.Commenter.Username}</h6>
                </div>
                
                <p>{displayedDateTime}</p>
              </div>
              <p>{comment.Comment.Data}</p>
            </div>
          );
        })
      }
      <div className='add-comment'>
        <h6>Προσθέστε Σχόλιο:</h6>
        <Input
          type='textarea'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          disabled={commentText.trim() === ''}
          className='comment-submit'
          onClick={() => handleCommentSubmit()}
        >Υποβολή Σχολίου</Button>
      </div>
    </div>
  );
}
 
export default Comments;