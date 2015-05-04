USE [master]
GO
-----------------------创建数据库-----------------------
IF exists(SELECT
            name
          FROM sysdatabases
          WHERE name = 'aeroplaneWebsite')
  DROP DATABASE aeroplaneWebsite
GO
CREATE DATABASE aeroplaneWebsite ON
  (
  NAME = 'aeroplaneWebsite',
  FILENAME = 'F:\Code\DATABASE\db\aeroplaneWebsite.mdf'
  )
LOG ON
  (
  NAME = 'aeroplaneWebsite_log',
  FILENAME = 'F:\Code\DATABASE\db\aeroplaneWebsite.ldf'
  )
GO
-----------------------使用数据库-----------------------
USE [aeroplaneWebsite]
GO
-----------------------创建数据表-----------------------
CREATE TABLE comment (
  id      INT IDENTITY PRIMARY KEY,
  poster  VARCHAR(12),
  mail    VARCHAR(20),
  content NVARCHAR(400) NOT NULL,
  date    DATETIME      NOT NULL
)
GO
-----------------------创建约束-----------------------
ALTER TABLE comment ADD
CONSTRAINT DF_comment_date DEFAULT getdate() FOR [date]
GO
-----------------------增加数据-----------------------
INSERT comment (poster, mail, content) VALUES ('Admin', default, '这里是留言板</br>您可以在这里给开发者留言也可以与其它玩家交流')