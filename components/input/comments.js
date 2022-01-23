import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;
  const [isCommentsFetching, setIsCommentsFetching] = useState();
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(async () => {
    if(showComments){
      setIsCommentsFetching(true);
      let res = await fetch('/api/comments/' + eventId);
      res = await res.json();
      setComments(res.comments)
      setIsCommentsFetching(false);
    }
  }, [showComments])

  async function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Comment Adding...',
      message: 'Comment is being Added now',
      status: 'pending'
    })
    try {
      let response = await fetch(`/api/comments/${eventId}`, {
        body: JSON.stringify(commentData),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if(response.ok){
        response = await response.json();
        notificationCtx.showNotification({
          title: 'Comment Added',
          message: response.message,
          status: 'success'
        })
        setComments(prev => [response.insertedData, ...prev])
        return;
      }

      
      response = await response.json();
      throw new Error(response.message);
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Oops, Something Went Wrong!!!',
        message: error.message,  
        status: 'error'
      })
    }

    // response = await res.json();
    // setComments(prev => [response.insertedData, ...prev])
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isCommentsFetching && <CommentList comments={comments} />}
      {isCommentsFetching && 'Loading...' }
    </section>
  );
}

export default Comments;
