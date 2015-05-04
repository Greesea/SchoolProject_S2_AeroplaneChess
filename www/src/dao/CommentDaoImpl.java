package dao;

import entity.Comment;
import utils.Drivers;

import java.sql.SQLException;
import java.util.ArrayList;

/**
 * Created by Drake on 2015/5/4.
 */
public class CommentDaoImpl extends BaseDao implements CommentDao {
    public CommentDaoImpl() {
        super(Drivers.SQLServer);
    }

    final double perPage = 10.0;

    @Override
    public Comment[] getComments_desc(int page) {
        ArrayList<Comment> list = new ArrayList<Comment>();

        try {
            preparedStatement = connection.prepareStatement("SELECT TOP " + (int) perPage + " id,poster,mail,content,date FROM comment WHERE id NOT IN (select top (" + (int) perPage + "*" + (page - 1) + ") id from comment order by id desc) ORDER BY id DESC");
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                list.add(new Comment(resultSet.getInt("id"), resultSet.getString("poster"), resultSet.getString("mail"), resultSet.getString("content"), resultSet.getTimestamp("date")));
            }
            return list.toArray(new Comment[list.size()]);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return new Comment[0];
    }

    @Override
    public boolean newComment(Comment comment) {
        try {
            preparedStatement = connection.prepareStatement("INSERT comment(poster,mail,content) VALUES (?,?,?)");

            preparedStatement.setString(1, ((!comment.getPoster().isEmpty()) ? comment.getPoster() : ""));
            preparedStatement.setString(2, ((!comment.getMail().isEmpty()) ? comment.getMail() : ""));
            preparedStatement.setString(3, comment.getContent());

            if (preparedStatement.executeUpdate() > 0) {
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public int getPageCount() {
        try {
            preparedStatement = connection.prepareStatement("SELECT count(0) 'count' FROM comment");
            resultSet = preparedStatement.executeQuery();
            resultSet.next();
            return (int) Math.ceil(resultSet.getInt("count") / perPage);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }
}
