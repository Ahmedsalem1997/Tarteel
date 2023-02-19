import Comment from "./Comment/Comment";
import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import AddComment from "./AddComment/AddComment";
import Translate from "../../helpers/Translate/Translate";

const Comments = (props) => {
  const { token } = getAuth();
  const { isLoading, error, sendRequest } = useHTTP();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  const getRecordComments = () => {
    sendRequest(
      {
        url: `records/${props.recordId}/comments?per_page=5&page=${page}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      },
      data => {
        setComments(prev => [...prev, ...data.data]);
        setTotalComments(data.meta.total);

      },
      err => {

      }
    )
  }
  const onShowMore = () => {
    setPage(prev => prev + 1);
  }
  useEffect(() => {
    getRecordComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className="comments">
        {comments.map(comment => {
          return (<Comment key={comment.id} comment={comment} />)
        })
        }
      </div>
      <div className="show-more">
        <button disabled={comments.length >= totalComments} className="main-button" onClick={onShowMore}><Translate id="button.showMore" /></button>
      </div>
      <div className="add-new-comment">
        <AddComment recordId={props.recordId} onAddComment={getRecordComments} />
      </div>
    </Fragment>
  );
};

export default Comments;
