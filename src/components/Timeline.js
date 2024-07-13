import React, { useEffect, useState } from 'react';
import { apiCallsUser } from '../api/calls/user';
import '../assets/css/components/timeline.css';
import { useSelector } from 'react-redux';
import Post from './Post';
import { apiCallsData } from '../api/calls/data';
import { Button, Input } from 'reactstrap';
import plusSvg from '../assets/svg/plus.svg';
import xSvg from '../assets/svg/x.svg';

const Timeline = (props) => {
  const userId = localStorage.getItem('userId');

  const [timeline, setTimeline] = useState([]);
  const [showPostInput, setShowPostInput] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    files: [],
  });

  const getTimeline = async () => {
    const response = await apiCallsUser.User.getTimeline(userId);
    setTimeline(response.data);
  };

  useEffect(() => {
    getTimeline();
  }, [userId]);

  const handleComment = async (postId, text) => {
    const response = await apiCallsData.Data.addComment(postId, userId, text);
    const newComment = response.data;

    setTimeline(timeline.map(post => {
      return post.Id === postId ? post : {
        ...post,
        Comments: [
          ...post.Comments,
          newComment,
        ]
      };
    }));
  };

  const createPost = async () => {
    const response  = await apiCallsData.Data.addPost(userId, newPost); 
    const uploadedPost = response.data;
    setTimeline([
      uploadedPost,
      ...timeline,
    ]);
    setShowPostInput(false);
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
      {
        showPostInput
        ? (
          <div className='post-input-container'>
          <div className='post-input-header'>
            <h5>Δημιουργία Δημοσίευσης</h5>
            <img src={xSvg} className='close-button' onClick={() => {
              setNewPost({
                title: '',
                content: '',
                files: [],
              });
              setShowPostInput(false);
            }}/>
          </div>
          <Input
            className='title-input'
            maxLength={30}
            placeholder='Τίτλος'
            onChange={(e) => {
              setNewPost({
                ...newPost,
                title: e.target.value,
              });
            }}
            value={newPost.title}
          />
          <Input
            className='post-input'
            type='textarea'
            maxLength={300}
            style={{
              minHeight: '100px',
              maxHeight: '100px'
            }}
            onChange={(e) => {
              setNewPost({
                ...newPost,
                content: e.target.value,
              });
            }}
            value={newPost.content}
          />
          <div className='post-input-footer'>
            <input 
              multiple 
              type='file' 
              onChange={(e) => {
                setNewPost({
                  ...newPost,
                  files: Array.from(e.target.files),
                });
              }}
            />
            <Button
              className='comment-submit'
              disabled={
                (newPost?.title ?? '').trim() === '' || 
                (newPost?.content ?? '').trim() === '' 
              }
              onClick={() => {createPost()}}
            >
              Υποβολή
            </Button>
          </div>
        </div>
        ) : (
          <div className='show-post-input' onClick={() => setShowPostInput(true)}>
            <img src={plusSvg} className='plus-button'/>
          </div>
        )
      }

    </div>
  );
}
 
export default Timeline;