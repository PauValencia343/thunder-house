	
USE master;
GO
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'db_thunder_house')
BEGIN
    ALTER DATABASE [db_thunder_house]
    SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE db_thunder_house
END;
GO
CREATE DATABASE db_thunder_house;
GO
USE db_thunder_house;
GO

