import { memo, useState, useCallback } from "react";
import commentsActions from "../../store-redux/comments/actions";
import CommentLayout from "../../components/comment-layout";
import PropTypes from "prop-types";
import "./style.css";

function Comment({ comment, isAuth }) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const callbacks = {
    onNewComment: useCallback(() => setShowReplyBox(true), []),
    onCancelComment: useCallback(() => setShowReplyBox(false), []),
    onSendComment: useCallback((parentId) =>
      dispatch(commentsActions.create(parentId), [])
    ),
  };
  return (
    <CommentLayout
      showReplyBox={showReplyBox}
      comment={comment}
      onNewComment={callbacks.onNewComment}
      onCancelComment={callbacks.onCancelComment}
      onSendComment={callbacks.onSendComment}
      isAuth={isAuth}
    />
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  isAuth: PropTypes.isAuth,
};

export default memo(Comment);
