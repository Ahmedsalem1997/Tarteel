import Comment from "./Comment/Comment";
import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";

const Comments = (props) => {
  const { isLoading, error, sendRequest } = useHTTP();
  const [comments, setComments] = useState([]);
  const getRecordComments = () => {
    sendRequest(
      {
        url: `records/${props.recordId}/comments`,
        method: 'GET'
      },
      data => {
        setComments(data.data);
      }
    )
  }
  useEffect(() => {
    getRecordComments();
  }, [])
  return (
    <Fragment>
      {
        comments.map(comment => {
          return (<Comment key={comment.id} comment={comment} />)
        })
      }
    </Fragment>
  );
};

export default Comments;
