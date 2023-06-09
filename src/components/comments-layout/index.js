import { memo } from "react";
import Comment from "../../containers/comment";
import PropTypes from "prop-types";
import "./style.css";

function CommentsLayout({
  count,
  commentsList,
  isAuth
}) {
  return (
    <div className="Comments">
      <h2>Комментарии ({commentsList?.length})</h2>
      {count &&
        commentsList.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            isAuth={isAuth}
          />
        ))}
    </div>
  );
}

CommentsLayout.propTypes = {
  count: PropTypes.number,
  commentsList: PropTypes.object,
  isAuth: PropTypes.bool,
};


export default memo(CommentsLayout);
