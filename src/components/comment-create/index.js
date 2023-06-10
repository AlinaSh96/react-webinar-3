import { memo, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

const replyMap = {
  new: "article",
  reply: "comment",
};

function CommentCreate({
  showReplyBox = false,
  onCancelComment,
  onSendComment,
  text,
  isAuth,
  currentCommentId,
  commentId,
  type,
  articleId,
  t,
}) {
  const [input, setInput] = useState("");
  const conditionForReply =
    type === "reply" && currentCommentId === commentId && !!showReplyBox;
  const conditionForNew = type === "new" && !showReplyBox;

  const idMap = {
    new: articleId,
    reply: commentId,
  };

  const render = () => {
    if ((conditionForReply || conditionForNew) && isAuth) {
      return (
        <>
          <p className="text">{text}</p>
          <input
            className="textarea"
            type="textarea"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <div className="buttons">
            {type === "reply" && (
              <button className="button_cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
            <button
              disabled={!input}
              onClick={(e) => onSendComment(input, replyMap[type], idMap[type])}
            >
              {t("send")}
            </button>
          </div>
        </>
      );
    } else if (!isAuth && conditionForReply) {
      return (
        <>
          <div className="auth">
            <p>
              <Link to="/login">{t("login")}</Link>, {t("to be able to reply")}.
            </p>
            {type === "reply" && (
              <button className="cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
          </div>
        </>
      );
    } else if (!isAuth && conditionForNew) {
      return (
        <>
          <div className="auth">
            <p>
              <Link to="/login">{t("login")}</Link>,{" "}
              {t("to be able to comment")}.
            </p>
            {type === "reply" && (
              <button className="cancel" onClick={onCancelComment}>
                {t("cancel")}
              </button>
            )}
          </div>
        </>
      );
    } else return null;
  };

  return <div className="CommentCreate">{render()}</div>;
}

CommentCreate.propTypes = {
  parentId: PropTypes.string,
  showReplyBox: PropTypes.bool,
  onCancelComment: PropTypes.func,
  onSendComment: PropTypes.func,
  text: PropTypes.string,
  isAuth: PropTypes.bool,
  currentCommentId: PropTypes.string,
  commentId: PropTypes.string,
  type: PropTypes.string.isRequired,
};

CommentCreate.defaultProps = {
  onCancelComment: () => {},
  onSendComment: () => {},
};

export default memo(CommentCreate);
