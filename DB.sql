DROP Database KubelabDashboard;

CREATE DATABASE KubelabDashboard;

USE KubelabDashboard;

-- Tables
CREATE TABLE Options (
    optionsId int AUTO_INCREMENT PRIMARY KEY,
    optionsName varchar(100),
    optionValue TEXT,
    optionsLastUpdate DATETIME
);

CREATE TABLE Templates (
    templateId int AUTO_INCREMENT PRIMARY KEY,
    templateTitle varchar(100),
    templateContent text,
    templateCreationDate date,
    templateLastUpdate datetime
);

CREATE TABLE Roles (
    roleId int AUTO_INCREMENT PRIMARY KEY,
    roleName varchar(100),
    stackLimit int,
    accessLevel ENUM("student", "admin", "superAdmin")
);

CREATE TABLE Teams (
    teamId int AUTO_INCREMENT PRIMARY KEY,
    teamName varchar(100),
    teamCreationDate Date
);

CREATE TABLE Users (
    userId int AUTO_INCREMENT PRIMARY KEY,
    username varchar(10),
    firstName varchar(100),
    lastName varchar(100),
    userEmail varchar(255),
    userPassword varchar(80),
    userProfilePicture blob,
    userExpirationDate Date,
    FK_role int,
    FK_options int,
    FOREIGN KEY (FK_role) REFERENCES Roles(RoleId),
    FOREIGN KEY (FK_options) REFERENCES Options(optionsId)
);

-- Composition table with foreign keys to Users and Teams
CREATE TABLE Composition_User_Team (
    UserId int,
    TeamId int,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (TeamId) REFERENCES Teams(TeamId)
);

CREATE table Stacks (
    stackId int AUTO_INCREMENT PRIMARY KEY,
    subDomain varchar(100),
    FK_templateId int,
    FK_userId int,
    stackName varchar(100),
    stackCreationDate date,
    stackLastUpdate datetime,
    stackLastActive datetime,
    FOREIGN KEY (FK_templateId) REFERENCES Templates(templateId),
    FOREIGN KEY (FK_userId) REFERENCES Users(userId)
);

-- -------------------------
-- INSERT DATA

INSERT INTO Options (optionsName, optionValue, optionsLastUpdate) VALUES
    ('apiToken1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', '2024-10-01 10:00:00'),
    ('apiToken2', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.S4fK9wRUSMeKKF2QT4fwpMeJf6POk6yJV_cQhtTsw5b', '2024-10-05 14:30:00'),
    ('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb21wYW55LmNvbSIsInVzZXJJZCI6NDM2NzI1fQ.s7fLyRSMeKKF2QT4fwpMeJf36POk6yJWf_dQYskkFzq', '2024-10-07 09:45:00'),
    ('refreshToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjg2NTUyMDB9.j8KnfpoRScRIdr1X8xqNTvM4oK5Tyo7LV8a_p8ksQ3c', '2024-10-08 12:15:00'),
    ('sessionSecret', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJzdWIiOiI0MTAifQ.MYgSdlplK2H4RWFhsUP1DFTszmNMoFwMpk3S7OpKvJY', '2024-10-10 08:20:00'),
    ('jwtSecret', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.XcOaPNe4RcsY3zRWWbT4KHc5IqsFk0pjcJpoXv_BpxI', '2024-10-11 11:30:00'),
    ('adminApiToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxfQ.k9Tl_SMeVnQP9N9cE5Z7RCh7PLF0pI2LVU8_SmrB_Us', '2024-10-15 16:45:00'),
    ('appApiToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOjIzNDU2N30.qfgXzw9zRxw5b2BR3Rf9HzV78SfRp7xKUjFxjR2z6k8', '2024-10-17 13:10:00'),
    ('serviceAuthToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzIjoiMjAyNC0xMi0yM30.kXpSlCMeY4VzQ1Z9aB7RHdY_6aS_Yv70bZtOyKzl4JE', '2024-10-18 09:00:00'),
    ('dataEncryptionKey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZGF0YV9rZXkifQ.4bG5hMOrScYgTF5Msm_fFkjoX3AOpd8Ua_4SH2l9tOw', '2024-10-20 15:25:00');


-- TEMPLATES
INSERT INTO Templates (templateTitle, templateContent, templateCreationDate, templateLastUpdate)
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
INSERT INTO Roles (roleName, stackLimit, accessLevel) VALUES 
    ('Student', 1, 'student'),
    ('Admin', 100, 'admin'),
    ('SuperAdmin', 9999, 'superAdmin');

-- TEAMS
INSERT INTO Teams (teamName, teamCreationDate) VALUES 
    ('No Team', '2000-01-01'),
    ('Development Team', '2024-10-01'),
    ('Design Team', '2024-10-05'),
    ('QA Team', '2024-10-10');
    
-- Users
INSERT INTO Users (username, firstName, lastName, userEmail, userPassword, userProfilePicture, userExpirationDate, FK_role, FK_options) VALUES
    ('kjc69123', 'Kenneth', 'Clausen', 'kenneth@example.com', 'Password@123', NULL, '2025-12-31', 3, 1),
    ('bob82134', 'Bob', 'Johnson', 'bob.johnson@example.com', 'Password@456', NULL, '2024-06-15', 1, 2),
    ('chbr22231', 'Charlie', 'Brown', 'charlie.brown@example.com', 'Password@789', NULL, '2024-07-01', 2, 2),
    ('depr99132', 'Diana', 'Prince', 'diana.prince@example.com', 'Password@101', NULL, '2024-05-20', 2, 2),
    ('edke02496', 'Edward', 'Kennedy', 'edward.kennedy@example.com', 'Password@112', NULL, '2025-03-10', 2, 1),
    ('figr12345', 'Fiona', 'Green', 'fiona.green@example.com', 'Password@131', NULL, '2024-10-29', 1, 2),
    ('gomi13375', 'George', 'Miller', 'george.miller@example.com', 'Password@415', NULL, '2024-11-15', 1, 3),
    ('hawm09090', 'Hannah', 'Williams', 'hannah.williams@example.com', 'Password@161', NULL, '2026-01-31', 3, 2),
    ('mdam13579', 'Morten', 'Damgaard', 'morten@example.com', 'Password@718', NULL, '2024-08-05', 2, 2),
    ('jedi42099', 'Jessica', 'Davis', 'jessica.davis@example.com', 'Password@192', NULL, '2025-09-30', 2, 3);

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

-- Stacks
INSERT INTO Stacks (subDomain, FK_templateId, FK_userId, stackName, stackCreationDate, stackLastUpdate, stackLastActive)
VALUES
    ('kenneth.dev', 1, 1, 'Kenneth Stack 1', '2024-01-10', '2024-02-15 12:00:00', '2024-03-01 14:30:00'),
    ('kenneth.prod', 2, 1, 'Kenneth Stack 2', '2024-02-05', '2024-03-18 09:20:00', '2024-04-12 17:45:00'),
    ('kenneth.test', 3, 1, 'Kenneth Stack 3', '2024-03-07', '2024-03-30 11:10:00', '2024-05-06 10:50:00'),
    
    ('bob.dev', 2, 2, 'Bob Stack 1', '2024-02-20', '2024-03-22 10:15:00', '2024-03-25 16:00:00'),
    ('charlie.dev', 1, 3, 'Charlie Stack', '2024-01-25', '2024-02-10 09:00:00', '2024-02-15 11:45:00'),
    
    ('diana.dev', 3, 4, 'Diana Stack', '2024-02-15', '2024-03-05 13:30:00', '2024-03-10 10:20:00'),
    
    ('fiona.prod', 1, 6, 'Fiona Stack', '2024-03-01', '2024-03-18 08:25:00', '2024-04-01 14:40:00'),
    ('george.test', 2, 7, 'George Stack', '2024-02-22', '2024-03-01 15:10:00', '2024-03-29 09:35:00'),
    
    ('hannah.dev', 1, 8, 'Hannah Stack', '2024-04-04', '2024-04-10 10:00:00', '2024-04-11 15:00:00'),
    ('jessica.prod', 3, 10, 'Jessica Stack', '2024-02-28', '2024-03-12 17:05:00', '2024-04-05 18:25:00');