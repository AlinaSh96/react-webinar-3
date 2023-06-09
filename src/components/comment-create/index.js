import { memo, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { comments } from "../../store-redux/exports";
import { Link } from "react-router-dom";

function CommentCreate({
  parentId,
  showReplyBox,
  onCancelComment,
  onSendComment,
  text,
  isAuth,
}) {
  const [replyText, setReplyText] = useState("");
  const inputEl = useRef(null);

  const render = () => {
    if (!!showReplyBox && isAuth) {
      return (
        <>
          <p>{text}</p>
          <input className="textarea" type="textarea"></input>
          <button onClick={onCancelComment}>Отмена</button>
          <button onClick={onSendComment}>Отправить</button>
        </>
      );
    } else if (!!showReplyBox && !isAuth) {
      return (
        <>
        <div className="auth">
          <p><Link to="/login">Войдите</Link>, чтобы иметь возможность ответить.</p>
          <button className="cancel" onClick={onCancelComment}>Отмена</button>
        </div>
        </>
      );
    } else return null
  };

  return (
    <>
      {!!showReplyBox && (
        <div className="CommentCreate">
           {render()}
        </div>
      )}
    </>
  );
}

// Controls.propTypes = {
//   onAdd: PropTypes.func
// };

// Controls.defaultProps = {
//   onAdd: () => {}
// }

export default memo(CommentCreate);
