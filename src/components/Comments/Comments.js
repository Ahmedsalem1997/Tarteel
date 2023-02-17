import Comment from "./Comment/Comment";
import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { useSelector } from "react-redux";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import AddComment from "./AddComment/AddComment";

const Comments = (props) => {
  const { token } = getAuth();
  const { isLoading, error, sendRequest } = useHTTP();
  const [comments, setComments] = useState([]);
  // const commentsChange = useSelector(state => state.records.comments);
  const getRecordComments = () => {
    sendRequest(
      {
        url: `records/${props.recordId}/comments`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      },
      data => {
        setComments(data.data);
      },
      err => {

      }
    )
  }
  useEffect(() => {
    getRecordComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className="comments">
        {comments.map(comment => {
          return (<Comment key={comment.id} comment={comment} />)
        })
        }
      </div>
      <div className="add-comment">
        <AddComment recordId={props.recordId} onAddComment={getRecordComments} />
      </div>
    </Fragment>
  );
};

export default Comments;
