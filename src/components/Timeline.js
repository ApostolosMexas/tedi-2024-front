import React, { useEffect, useState } from 'react';
import { apiCallsUser } from '../api/calls/user';
import '../assets/css/components/timeline.css';
import { useSelector } from 'react-redux';
import Post from './Post';
import { apiCallsData } from '../api/calls/data';

const Timeline = (props) => {
  const userId = useSelector(state => state.auth.userId);

  const [timeline, setTimeline] = useState([]);

  const getTimeline = async () => {
    const response = await apiCallsUser.User.getTimeline(userId);
    setTimeline(response.data);
  }

  useEffect(() => {
    getTimeline();
  }, [userId]);

  const handleComment = async (postId, text) => {
    const response = await apiCallsData.Data.addComment(postId, userId, text);
    const newComment = response.data;

    setTimeline(timeline.map(post => {
      console.log(post)
      return post.Id === postId ? post : {
        ...post,
        Comments: [
          ...post.Comments,
          newComment,
        ]
      };
    }));
  };

  return (
    <div className='timeline-container'>
      <h2>Χρονολόγιο</h2>
      <div className='timeline'>
        {
          timeline.map(post => {
            return (
              <Post key={post.Post.Post.Id} post={post} handleComment={handleComment}/>
            );
          })
        }
      </div>
    </div>
  );
}
 
export default Timeline;