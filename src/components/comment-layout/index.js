import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import CommentCreate from "../comment-create";

function CommentLayout({
  comment,
  showReplyBox,
  onSendComment,
  onCancelComment,
  onNewComment,
  isAuth
}) {
  return (
    <div style={{ marginLeft: `${comment.margin}px` }} className="Comment">
      <div className="comment__info">
        <p className="comment__authorName">{comment.authorName}</p>
        <p className="comment__createdAt">
          {new Date(comment.createdAt).toLocaleString("ru", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <p className="comment__text">{comment.text}</p>
      <button className="comment__reply" onClick={onNewComment}>
        Ответить
      </button>
      <CommentCreate
        showReplyBox={showReplyBox}
        onSendComment={onSendComment}
        onCancelComment={onCancelComment}
        text={'Новый ответ'}
        isAuth = {isAuth}
      />
    </div>
  );
}

CommentLayout.propTypes = {
  articleId: PropTypes.string,
  comment: PropTypes.object,
  showReplyBox : PropTypes.bool,
  onSendComment : PropTypes.func,
  onCancelComment : PropTypes.func,
  onNewComment : PropTypes.func,
  isAuth: PropTypes.bool,
};

CommentLayout.defaultProps = {
  onSendComment: () => {},
  onCancelComment: () => {},
  onNewComment: () => {},
}

export default memo(CommentLayout);
