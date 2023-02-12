import Comment from "./Comment/Comment";
import { Fragment } from "react";

const Comments = (props) => {
  return (
    <Fragment>
      {
        props.comments.map(comment => {
          return (<Comment key={comment.id} comment={comment} />)
        })
      }
    </Fragment>
  );
};

export default Comments;
