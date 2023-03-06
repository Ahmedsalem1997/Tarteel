import Comment from "./Comment/Comment";
import { Fragment, useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { getAuth } from "../../utils/Auth";
import Loader from "../Loader/Loader";
import AddComment from "./AddComment/AddComment";
import { useDispatch } from "react-redux";
import { modalsActions } from "../../store/Modals/Modals";

const Comments = (props) => {
  const { token, isAuth } = getAuth();
  const { isLoading, error, sendRequest } = useHTTP();
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100));
  // const [commentsToShow, setCommentsToShow] = useState([]);
  // const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(5);
  // const [totalComments, setTotalComments] = useState(0);
  const openLoginModal = () => {
    dispatch(modalsActions.openLoginModal());
  }
  const getRecordComments = (oldComments) => {
    // if (page > 1) {
    //   setPerPage(prev => prev * page);
    // }
    if (isAuth) {
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
          // if (oldComments) {
          //   setComments([...oldComments, ...data.data]);
          // } else {
          setComments(data.data.sort((a, b) => b.user.is_sheikh - a.user.is_sheikh));
          // }
          // if (page === 1) {
          // } else {
          //   setComments(prev => [...prev, ...data.data]);
          // }
          // setTotalComments(data.meta.total);
        },
        err => {

        }
      )
    } else {
      openLoginModal();
    }
  }
  // const onShowMore = () => {
  //   setPage(prev => prev + 1);
  //   getRecordComments(commentsToShow);
  // }
  useEffect(() => {
    getRecordComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onAddComment = () => {
    // setPerPage(prev => prev * page);
    // let currentPage = page;
    // setPage(1);

    props.onAddComment();
    getRecordComments();
    setRandomNum(Math.floor(Math.random() * 100));
    // setPage(currentPage);
  }
  return (
    <Fragment>
      {isLoading && <Loader />}
      <div className="comments">
        {comments.map(comment => {
          return (<Comment key={comment.id} comment={comment} />)
        })
        }
      </div>
      {/* {comments.length < totalComments && <div className="show-more">
        <button className="main-button" onClick={onShowMore}><Translate id="button.showMore" /></button>
      </div>} */}
      <div className="add-new-comment">
        <AddComment key={randomNum} recordId={props.recordId} onAddComment={onAddComment} />
      </div>
    </Fragment>
  );
};

export default Comments;
