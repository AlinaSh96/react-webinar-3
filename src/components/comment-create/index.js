import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

const replyMap = {
  'new': 'article',
  'reply': 'comment',
}

function CommentCreate({
  showReplyBox,
  onCancelComment,
  onSendComment,
  text,
  isAuth,
  currentCommentId,
  commentId,
  type,
  articleId,
}) {
  const [input, setInput] = useState('');
  const conditionForReply = type === 'reply' && (currentCommentId === commentId) && !!showReplyBox;
  const conditionForNew = type === 'new' && !showReplyBox;

  const idMap =  {
      'new': articleId,
      'reply': commentId,
    }

  const render = () => {
    if ((conditionForReply || conditionForNew ) && isAuth) {
      return (
        <>
          <p className="text">{text}</p>
          <input className="textarea" type="textarea" onChange={(e) => setInput(e.target.value)}></input>
          {type === 'reply' && <button className="button_cancel"  onClick={onCancelComment}>Отмена</button>}
          <button onClick={(e) => onSendComment(input, replyMap[type], idMap[type])}>Отправить</button>
        </>
      );
    } else if (!isAuth && (conditionForReply || conditionForNew )) {
      return (
        <>
        <div className="auth">
          <p><Link to="/login">Войдите</Link>, чтобы иметь возможность ответить.</p>
          {type === 'reply' && <button className="cancel" onClick={onCancelComment}>Отмена</button>}
        </div>
        </>
      );
    } else return null
  };

  return (
        <div className="CommentCreate">
           {render()}
        </div>
  );
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
  onSendComment: () => {}
}

export default memo(CommentCreate);
