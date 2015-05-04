package dao;

import entity.Comment;

/**
 * Created by Drake on 2015/5/4.
 */
public interface CommentDao {
    Comment[] getComments_desc(int page);

    boolean newComment(Comment comment);

    int getPageCount();
}
