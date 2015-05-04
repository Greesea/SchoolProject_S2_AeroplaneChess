package utils;

import java.sql.*;
import java.text.MessageFormat;

/**
 * Created by tsaccp on 2012/5/12.
 */
public class SQLServerManager {
    private final static String DATABASE_TARGET = "localhost:1433";
    private final static String DATABASE_NAME = "aeroplaneWebsite";
    private final static String DATABASE_ID = "sa";
    private final static String DATABASE_PWD = "accp";

    private static String connStr = "";
    private static boolean isInit = false;

    static {
        connStr = MessageFormat.format("jdbc:sqlserver://{0};DatabaseName={1}", DATABASE_TARGET, DATABASE_NAME);

        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            isInit = true;
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取可用连接
     *
     * @return java.sql.Connection
     * @throws utils.DriverNotFoundException 没有找到对应驱动
     */
    public static Connection CreateConnection() throws DriverNotFoundException, SQLException {
        if (isInit) {
            try {
                return DriverManager.getConnection(connStr, DATABASE_ID, DATABASE_PWD);
            } catch (SQLException e) {
                throw e;
            }
        }
        throw new DriverNotFoundException(Drivers.SQLServer, "Failed to create connection,SQLServer driver not found");
    }

    /**
     * 关闭对象
     *
     * @param obj 对象列表(ResultSet,PreparedStatement,Connection)
     */
    public static void Close(Object... obj) {
        for (Object anObj : obj) {
            if (anObj instanceof ResultSet) {
                try {
                    ((ResultSet) anObj).close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            } else if (anObj instanceof PreparedStatement) {
                try {
                    ((PreparedStatement) anObj).close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            } else if (anObj instanceof Connection) {
                try {
                    ((Connection) anObj).close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}