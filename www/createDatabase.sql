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
  poster  VARCHAR(12)  NOT NULL,
  mail    VARCHAR(20)  NOT NULL,
  content NVARCHAR(200) NOT NULL,
  date    DATETIME     NOT NULL
)
GO
-----------------------创建约束-----------------------
ALTER TABLE comment ADD
CONSTRAINT DF_comment_poster DEFAULT 'anonymous' FOR [poster],
CONSTRAINT DF_comment_mail DEFAULT '' FOR [mail],
CONSTRAINT DF_comment_content DEFAULT '' FOR [content],
CONSTRAINT DF_comment_date DEFAULT getdate() FOR [date]
GO