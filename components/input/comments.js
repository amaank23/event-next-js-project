import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  useEffect(async () => {
    if(showComments){
      let res = await fetch('/api/comments/' + eventId);
      res = await res.json();
      setComments(res.comments)
    }
  }, [showComments])

  async function addCommentHandler(commentData) {
    const res = await fetch(`/api/comments/${eventId}`, {
      body: JSON.stringify(commentData),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await res.json();
    setComments(prev => [...prev, response.insertedData])
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
