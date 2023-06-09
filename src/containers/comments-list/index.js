import { memo, useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import commentsActions from "../../store-redux/comments/actions";
import shallowequal from "shallowequal";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import useTranslate from "../../hooks/use-translate";
import CommentsLayout from "../../components/comments-layout";
import useSelector from "../../hooks/use-selector";
import CommentCreate from "../../components/comment-create";
import CommentLayout from "../../components/comment-layout";

function CommentsList({ articleId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commentsActions.loadById(articleId));
  }, []);

  const [showReplyBox, setShowReplyBox] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState("");

  const select = useSelectorRedux(
    (state) => ({
      comments: state.comments.data.items,
      waiting: state.comments.waiting,
      count: state.comments.data.count,
    }),
    shallowequal
  );

  const selectCustom = useSelector((state) => ({
    exists: state.session.exists,
  }));

  const commentList = useMemo(() => {
    if (select.count) {
      const prepare = select.comments.map((item) => ({
        ...item,
        parent:
          item.parent._type === "article" ? null : { _id: item.parent._id },
      }));
      return treeToList(listToTree(prepare), (item, level) => ({
        _id: item._id,
        createdAt: item.dateCreate,
        authorName: item.author.profile.name,
        text: item.text,
        level,
        margin: level * 30,
      }));
    }
  }, [select.comments]);

  const callbacks = {
    onNewComment: useCallback((id) => {
      console.log(id);
      setShowReplyBox(true);
      setCurrentCommentId(id);
    }, []),
    onCancelComment: useCallback(() => setShowReplyBox(false), []),
    onSendComment: useCallback((parentId) =>
      dispatch(commentsActions.create(parentId), [])
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout>
        <h2>Комментарии ({commentList?.length || 0})</h2>
        {commentList?.length &&
          commentList.map((comment) => (
            <CommentLayout
              key={comment._id}
              showReplyBox={showReplyBox}
              comment={comment}
              onNewComment={callbacks.onNewComment}
              onCancelComment={callbacks.onCancelComment}
              onSendComment={callbacks.onSendComment}
              currentCommentId={currentCommentId}
              commentId={comment._id}
              isAuth={selectCustom.exists}
            />
          ))}
        <CommentCreate
        type = 'new'
        showReplyBox={showReplyBox}
        onSendComment={callbacks.onSendComment}
        onCancelComment={callbacks.onCancelComment}
        onNewComment={callbacks.onNewComment}
        text={'Новый комментарий'}
        isAuth={selectCustom.exists}
        currentCommentId={currentCommentId}
      />
      </CommentsLayout>
    </Spinner>
  );
}

CommentsList.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsList);
