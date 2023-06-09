import { memo, useEffect, useMemo } from "react";
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

function CommentsList({ articleId }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commentsActions.loadById(articleId));
  }, []);

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
        parent: item.parent._type === "article" ? null : { _id: item.parent._id },
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

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout
        commentsList={commentList}
        count={select.count}
        isAuth={selectCustom.exists}
      />
    </Spinner>
  );
}

CommentsList.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(CommentsList);
