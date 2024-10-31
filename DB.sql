CREATE DATABASE KubelabDashboard;

USE KubelabDashboard;

-- Tables
CREATE TABLE Templates (
    TemplateId int AUTO_INCREMENT PRIMARY KEY,
    Title varchar(100),
    Content text,
    CreationDate date,
    LastUpdate date
);

CREATE TABLE Roles (
    RoleId int AUTO_INCREMENT PRIMARY KEY,
    Name varchar(80),
    StackLimit int
);

CREATE TABLE Teams (
    TeamId int AUTO_INCREMENT PRIMARY KEY,
    Name varchar(200),
    CreationDate Date
);

CREATE TABLE Credentials (
    Email varchar(200) PRIMARY KEY,
    `Password` varchar(100)
);

CREATE TABLE UserProfiles (
    Username VARCHAR(20) PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100)
);

CREATE TABLE Users (
    UserId int AUTO_INCREMENT PRIMARY KEY,
    ExpirationDate Date,
    FK_UserProfile varchar(20),
    FK_Credential varchar(200),
    FK_Role int,
    FK_TeamId int,
    FOREIGN KEY (FK_UserProfile) REFERENCES UserProfiles(Username),
    FOREIGN KEY (FK_Credential) REFERENCES Credentials(Email),
    FOREIGN KEY (FK_Role) REFERENCES Roles(RoleId),
    FOREIGN KEY (FK_TeamId) REFERENCES Teams(TeamId)
);

-- Composition table with foreign keys to Users and Teams
CREATE TABLE Composition_User_Team (
    UserId int,
    TeamId int,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (TeamId) REFERENCES Teams(TeamId)
);

-- -------------------------
-- INSERT DATA

-- TEMPLATES
INSERT INTO Templates (Title, Content, CreationDate, LastUpdate)
VALUES 
    ('Server Configuration', 
    'version: "3.8"\nservices:\n  web:\n    image: nginx\n    ports:\n      - "80:80"\n', 
    '2024-10-29', 
    '2024-10-29'),

    ('Database Setup', 
    'databases:\n  - name: mainDB\n    user: admin\n    password: pass123\n  - name: testDB\n    user: tester\n    password: test123\n', 
    '2024-10-20', 
    '2024-10-25'),

    ('Application Config', 
    'app:\n  name: Kubelab\n  environment: production\n  logging:\n    level: info\n', 
    '2024-10-10', 
    '2024-10-15');

-- ROLES
INSERT INTO Roles (Name, StackLimit) VALUES 
    ('Student', 1),
    ('Admin', 100),
    ('SuperAdmin', 9999);

-- TEAMS
INSERT INTO Teams (Name, CreationDate) VALUES 
    ('No Team', '2000-01-01'),
    ('Development Team', '2024-10-01'),
    ('Design Team', '2024-10-05'),
    ('QA Team', '2024-10-10');
    
-- CREDENTIALS
INSERT INTO Credentials (Email, `Password`) VALUES 
    ('kenneth@example.com', 'Password@123'),
    ('bob.johnson@example.com', 'Password@456'),
    ('charlie.brown@example.com', 'Password@789'),
    ('diana.prince@example.com', 'Password@101'),
    ('edward.kennedy@example.com', 'Password@112'),
    ('fiona.green@example.com', 'Password@131'),
    ('george.miller@example.com', 'Password@415'),
    ('hannah.williams@example.com', 'Password@161'),
    ('morten@example.com', 'Password@718'),
    ('jessica.davis@example.com', 'Password@192');

-- USER PROFILES
INSERT INTO UserProfiles (Username, FirstName, LastName) VALUES
    ('kjc69123', 'Kenneth', 'Clausen'),          
    ('bob82134', 'Bob', 'Johnson'),           
    ('chbr22231', 'Charlie', 'Brown'),       
    ('depr99132', 'Diana', 'Prince'),         
    ('edke02496', 'Edward', 'Kennedy'),     
    ('figr12345', 'Fiona', 'Green'),           
    ('gomi13375', 'George', 'Miller'),       
    ('hawm09090', 'Hannah', 'Williams'),   
    ('mdam13579', 'Morten', 'Damgaard'),             
    ('jedi42099', 'Jessica', 'Davis');       

-- USERS
INSERT INTO Users (ExpirationDate, FK_Credential, FK_Role, FK_TeamId, FK_UserProfile) VALUES 
    ('2025-12-31', 'kenneth@example.com', 3, 1, 'kjc69123'),           
    ('2024-06-15', 'bob.johnson@example.com', 1, 2, 'bob82134'),       
    ('2024-07-01', 'charlie.brown@example.com', 2, 2, 'chbr22231'),    
    ('2024-05-20', 'diana.prince@example.com', 2, 2, 'depr99132'),     
    ('2025-03-10', 'edward.kennedy@example.com', 2, 1, 'edke02496'),   
    ('2024-10-29', 'fiona.green@example.com', 1, 2, 'figr12345'),      
    ('2024-11-15', 'george.miller@example.com', 1, 3, 'gomi13375'),    
    ('2026-01-31', 'hannah.williams@example.com', 3, 2, 'hawm09090'),  
    ('2024-08-05', 'morten@example.com', 2, 2, 'mdam13579'),           
    ('2025-09-30', 'jessica.davis@example.com', 2, 3, 'jedi42099');    

-- USER-TEAM COMPOSITION
INSERT INTO Composition_User_Team (UserId, TeamId) VALUES
    (1, 1), 
    (1, 2),
    (1, 3),
    (2, 2), 
    (3, 2), 
    (4, 2), 
    (5, 1), 
    (6, 2), 
    (7, 3), 
    (8, 2), 
    (9, 1), 
    (9, 2),
    (9, 3),
    (10, 3);
