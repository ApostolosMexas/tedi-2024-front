import React from 'react';
import '../assets/css/components/postActivity.css'

const PostActivity = ({ postActivity }) => {
  const date = new Date(postActivity.CreatedAt).toLocaleDateString("el-GR") ?? '';
  const time = new Date(postActivity.CreatedAt).toLocaleTimeString("el-GR") ?? '';
  const displayedDateTime = `${date !== "Invalid Date" ? date : ''} ${time !== "Invalid Date" ? time : ''}`;
  
  return (
    <div className='post-activity-item'>
      <p>{postActivity.Content}</p>
      <p>{displayedDateTime}</p>
    </div>
  );
}
 
export default PostActivity;