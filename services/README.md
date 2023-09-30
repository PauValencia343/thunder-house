# Thunder-House-Services

Brief project description here.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **SQL Server:** Install SQL Server on your machine.
- **Node.js:** Install Node.js if you haven't already.
- **TypeScript:** Install TypeScript globally using the following command:

    ```
    npm install -g typescript
    ```

## Installation
1. Create a SQL Server Database:

Execute the following SQL script in your SQL Server management tool to create the database:

```
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
```
2. Navigate to the project directory:
```
cd services
```
3. Install Dependencies
```
npm install
```
4. Build the Project:
```
npm run ts
npm run build
```
