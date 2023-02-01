import Comment from "./Comment/Comment";
import AddComment from "./AddComment/AddComment";
import { Fragment } from "react";

const Comments = () => {
  return (
    <Fragment>
      <Comment />
      <Comment />
      <Comment />
      <AddComment />
      <AddComment />
    </Fragment>
  );
};

export default Comments;
