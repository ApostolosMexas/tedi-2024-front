import React, { useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import '../assets/css/components/post.css';
import { apiCallsData } from '../api/calls/data';
import chatBlank from '../assets/svg/chat.svg';
import Like from './Like';
import Comments from './Comments';

const Post = ({ post, handleComment }) => {
  const userId = localStorage.getItem('userId');
  const [showComments, setShowComments] = useState(false);
  const [likeId, setLikeId] = useState(post.Likes.find((like) => {
    return like.UserId === userId;
  })?.Id ?? null);

  const date = new Date(post.Post.Post.CreatedAt).toLocaleDateString("el-GR");
  const time = new Date(post.Post.Post.CreatedAt).toLocaleTimeString("el-GR");
  const displayedDateTime = `${date !== "Invalid Date" ? date : ''} ${time !== "Invalid Date" ? time : ''}`;

  const toggleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleLikeClicked = async () => {
    if (likeId) {
      await apiCallsData.Data.unlikePost(likeId);
      setLikeId(null);
    } else {
      const response = await apiCallsData.Data.likePost(userId, post.Post.Post.Id);
      const id = response.data.Id;
      setLikeId(id);
    }
  };

  return (
    <Card>
      <CardHeader className='border-0 post-container'>
        <h4>{post.Post.Post.Title}</h4>
        <h6>{displayedDateTime}</h6>
      </CardHeader>
      <CardBody className='post-body'>
        <p style={{fontSize: '0.8rem', margin: '0 0 10px 0'}}>Δημοσιέυθηκε από τον χρήστη {post.Poster.Username}</p>

        <p>
          {post.Post.Post.Data}
        </p>
        {
          post.Post.PostMedia.length > 0 && (
            <div className='media-container'>
              <h6>Πολυμέσα:</h6>
              <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
              >
                {
                  post.Post.PostMedia.map(media => {
                    return(
                      <a key={media.Path} href={`${process.env.REACT_APP_API_LINK}posts/uploads/${media.Path}`}>
                        {
                          (media.Path.includes('.png') || media.Path.includes('.jpg') || media.Path.includes('.jpeg'))
                          ?
                            <img height='100px' width='100px' alt={media.Path} src={`${process.env.REACT_APP_API_LINK}posts/uploads/${media.Path}`} />
                          :
                            <video height='100px' width='100px' src={`${process.env.REACT_APP_API_LINK}posts/uploads/${media.Path}`} />
                        }
                      </a>
                    );
                  })
                }
              </LightGallery>
            </div>
          )
        }
      </CardBody>
      <CardBody>
        <div className='post-info-container'>
          <Like
            postId={post.Post.Post.Id}
            likes={post.Likes}
            liked={likeId != null}
            handleLikeClicked={() => handleLikeClicked()}
          />
          <div className={`show-comment-container ${showComments ? 'show' : ''}`} onClick={() => toggleShowComments()}>
            Comments <img src={chatBlank} />
          </div>
        </div>
        {
          showComments && <Comments comments={post.Comments} handleComment={(text) => handleComment(post.Post.Post.Id, text)}/>
        }
      </CardBody>
    </Card>
  );
}
 
export default Post;