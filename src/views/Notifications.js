import React, { useEffect, useState } from 'react';
import { apiCallsUser } from '../api/calls/user';
import '../assets/css/components/notifications.css';
import ConnectionRequest from '../components/ConnectionRequest';
import PostActivity from '../components/PostActivity';
import Pagination from '../components/Pagination';

const Notifications = () => {
  const userId = localStorage.getItem('userId');
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [postActivity, setPostActivity] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchConnectionRequests = async () => {
    const response = await apiCallsUser.User.getConnectionRequests(userId, 'pending');
    setConnectionRequests(response.data);
  };

  const fetchPostActivity = async () => {
    const response = await apiCallsUser.User.getPostActivity(userId, limit, currentPage);
    setPostActivity(response.data.Notifications);
    setTotalPages(response.data.TotalPages);
  };

  useEffect(() => {
    fetchConnectionRequests();
    fetchPostActivity();
  }, [userId]);

  useEffect(() => {
    fetchPostActivity();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='notifications-container'>
      <h2>Ειδοποιήσεις</h2>

      <div>
        <h4>Αιτήματα Σύνδεσης</h4>
        {
          connectionRequests.length > 0 ? (
            <div className='slider'>
              {
                connectionRequests.map(request => {
                  return (
                    <ConnectionRequest
                      key={request.Connection.Id}
                      request={request}
                    />
                  );
                })
              }
            </div>
          ) : (
            <p style={{margin: '10px 0'}}>
              Δεν υπάρχουν Αιτήματα Σύνδεσης.
            </p>
          )
        }
      </div>

      <div className='post-activity-container'>
        <h4>Δραστηριότητα Δημοσιεύσεων</h4>
        {
          postActivity.length > 0 ? (
            <>
              <div style={{margin: '10px 0'}}>
                {
                  postActivity.map(activity => {
                    return (
                      <PostActivity
                        key={activity.Id}
                        postActivity={activity}
                      />
                    );
                  })
                }
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p>
              Δεν υπάρχει Δραστηριότητα Δημοσιεύσεων.
            </p>
          )
        }
      </div>
    </div>
  );
}
 
export default Notifications;