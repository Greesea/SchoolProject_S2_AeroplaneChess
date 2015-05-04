package dao;

import utils.DriverNotFoundException;
import utils.Drivers;
import utils.SQLServerManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Drake on 2015/3/14.
 */
public class BaseDao {
    /**
     * 连接对象
     */
    protected Connection connection;

    /**
     * 预处理语句对象
     */
    protected PreparedStatement preparedStatement;

    /**
     * 结果集对象
     */
    protected ResultSet resultSet;

    protected Drivers usedDriver;

    public BaseDao(Drivers driver) {
        try {
            usedDriver = Drivers.SQLServer;
            switch (driver) {
                case DB2:
                    break;
                case Derby:
                    break;
                case H2:
                    break;
                case HSQLDB:
                    break;
                case MySQL:
                    break;
                case ODBC:
                    break;
                case Oracle:
                    break;
                case PostgreSQL:
                    break;
                case SQLServer:
                    connection = SQLServerManager.CreateConnection();
                    break;
                case SQLite:
                    break;
                case Sybase:
                    break;
            }
        } catch (DriverNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * 关闭使用的连接等对象
     */
    public void Dispose() {
        switch (usedDriver) {
            case DB2:
                break;
            case Derby:
                break;
            case H2:
                break;
            case HSQLDB:
                break;
            case MySQL:
                break;
            case ODBC:
                break;
            case Oracle:
                break;
            case PostgreSQL:
                break;
            case SQLServer:
                SQLServerManager.Close(connection, preparedStatement, resultSet);
                break;
            case SQLite:
                break;
            case Sybase:
                break;
        }
    }
}
