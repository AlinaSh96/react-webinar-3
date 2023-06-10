import { memo } from "react";
import PropTypes from "prop-types";
import CommentCreate from "../comment-create";
import formatDate from "../../utils/format-date";
import {cn as bem} from '@bem-react/classname';
import "./style.css";

function CommentLayout({
  comment,
  showReplyBox,
  onSendComment,
  onCancelComment,
  onNewComment,
  isAuth,
  currentCommentId,
  articleId,
  currentUserId,
  t
}) {
  const cn = bem("Comment");
  const authorIsMe = currentUserId === comment.authorId;
  const authorNameClass = authorIsMe ? "authorName authorIsMe" : "authorName";
  return (
    <div style={{ marginLeft: `${comment.margin}px` }} className="Comment">
      <div className={cn("info")}>
        <p className={authorNameClass}>{comment.authorName}</p>
        <p className={cn("createdAt")}>
          {formatDate(comment.createdAt)}
        </p>
      </div>
      <p className={cn("text")}>{comment.text}</p>
      {<button className={cn("reply")} onClick={(e) => onNewComment(comment._id)}>
        {t("answer")}
      </button> }
      <CommentCreate
        type = "reply"
        showReplyBox={showReplyBox}
        onSendComment={onSendComment}
        onCancelComment={onCancelComment}
        text={t("new answer")}
        isAuth = {isAuth}
        currentCommentId={currentCommentId}
        commentId = {comment._id}
        articleId={articleId}
        t={t}
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
