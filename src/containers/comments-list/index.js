import { memo, useEffect, useMemo, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import commentsActions from "../../store-redux/comments/actions";
import shallowequal from "shallowequal";
import PropTypes from "prop-types";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

import Spinner from "../../components/spinner";
import CommentsLayout from "../../components/comments-layout";
import CommentCreate from "../../components/comment-create";
import CommentLayout from "../../components/comment-layout";

function CommentsList({ articleId }) {
  const dispatch = useDispatch();
  const { t } = useTranslate();

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [currentCommentData, setCurrentCommentId] = useState({
    currentCommentId: '',
    currentParentId: '',
  });
  const [currentParentId, setCurrentParentId] = useState("");

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
      count: state.comments.data.count,
    }),
    shallowequal
  );

  useEffect(() => {
    dispatch(commentsActions.loadById(articleId));
  }, []);

  const selectCustom = useSelector((state) => ({
    exists: state.session.exists,
    currentUserId: state.session.user._id,
  }));

  const commentList = useMemo(() => {
    if (select.count) {
      return listToTree(select.comments)
    }
  }, [select.comments]);

  const callbacks = {
    onNewComment: useCallback((id, parent) => {
      setShowReplyBox(true);
      setCurrentCommentId({
        currentCommentId: id,
        currentParentId: parent,
      });
    }, []),
    onCancelComment: useCallback(() => setShowReplyBox(false), []),
    onSendComment: useCallback((text, type, parentId) =>
      dispatch(commentsActions.create(text, type, parentId),
      setShowReplyBox(false), [])
    ),
  };
  return (
    <Spinner active={select.waiting}>
      <CommentsLayout>
        <h2>
          {t("comment")} ({select.count || 0})
        </h2>
 
        {commentList?.length &&
          commentList.map((comment) => (
            <>
            <CommentLayout
              key={comment._id}
              showReplyBox={showReplyBox}
              comment={comment}
              onNewComment={callbacks.onNewComment}
              onCancelComment={callbacks.onCancelComment}
              onSendComment={callbacks.onSendComment}
              currentCommentId={currentCommentData.currentCommentId}
              isAuth={selectCustom.exists}
              articleId={articleId}
              currentUserId={selectCustom.currentUserId}
              t={t}
              level={0}
              currentParentId={comment.parent._id}
            />
            </>
          ))}
        <CommentCreate
          type="new"
          showReplyBox={showReplyBox}
          onSendComment={callbacks.onSendComment}
          onCancelComment={callbacks.onCancelComment}
          onNewComment={callbacks.onNewComment}
          text={t("new comment")}
          isAuth={selectCustom.exists}
          currentCommentId={currentCommentData.currentCommentId}
          articleId={articleId}
          t={t}
        />
      </CommentsLayout>
    </Spinner>
  );
}

CommentsList.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsList);
