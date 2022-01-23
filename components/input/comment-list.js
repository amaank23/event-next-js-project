import classes from './comment-list.module.css';

function CommentList({ comments }) {
  // console.log(comments);
  return comments.length === 0  ? 'No Comments Found' : (
    <ul className={classes.comments}>
      {comments.map(comment => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
