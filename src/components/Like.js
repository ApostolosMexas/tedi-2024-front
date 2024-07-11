import React from 'react';
import thumbsUpBlank from '../assets/svg/hand-thumbs-up.svg';
import '../assets/css/components/like.css';

const Like = ({ postId, likes, liked, handleLikeClicked}) => {

  return (
    <div className={`like-container ${liked ? 'liked' : ''}`} onClick={() => handleLikeClicked()}>
      <p>{`${likes.length} Like${likes.length > 1 ? 's' : ``}`}</p>
       
      <img src={thumbsUpBlank} />
    </div>
  );
}
 
export default Like;