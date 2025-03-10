-- Создание таблицы Users
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(64) NOT NULL UNIQUE,
    password VARCHAR(64) NOT NULL,
    role VARCHAR(64) NOT NULL,
    name VARCHAR(64) DEFAULT 'hieu'
);

-- Создание таблицы Clubs
CREATE TABLE IF NOT EXISTS Clubs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    id_league INT DEFAULT -1
);

-- Создание таблицы Leagues
CREATE TABLE IF NOT EXISTS Leagues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    id_user INT,
    FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE
);

-- Создание таблицы Matches
CREATE TABLE IF NOT EXISTS Matches (
    id SERIAL PRIMARY KEY,
    goal_home_club INT DEFAULT -1,
    goal_guest_club INT DEFAULT -1,
    id_league INT NOT NULL,
    id_home_club INT NOT NULL,
    id_guest_club INT NOT NULL,
    FOREIGN KEY (id_league) REFERENCES Leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (id_home_club) REFERENCES Clubs(id) ON DELETE CASCADE,
    FOREIGN KEY (id_guest_club) REFERENCES Clubs(id) ON DELETE CASCADE
);

DO $$ 
BEGIN 
    FOR i IN 1..100 LOOP 
        INSERT INTO Users (login, password, role, name) 
        VALUES ( 
            'user' || i, 
            'password' || i, 
            CASE WHEN i % 2 = 0 THEN 'Admin' ELSE 'Referee' END, 
            'User  ' || i 
        ); 
    END LOOP; 
END $$;

DO $$ 
BEGIN 
    FOR i IN 1..10 LOOP  -- Assuming you want 10 leagues
        INSERT INTO Leagues (name, id_user) 
        VALUES ( 
            'League ' || i, 
            (i % 100) + 1  -- Assign a user from 1 to 100
        ); 
    END LOOP; 
END $$;

DO $$ 
BEGIN 
    FOR i IN 1..100 LOOP 
        INSERT INTO Clubs (name, id_league) 
        VALUES ( 
            'Club ' || i, 
            (i % 10) + 1  -- Assign to leagues 1 to 10
        ); 
    END LOOP; 
END $$;

DO $$ 
BEGIN 
    FOR i IN 1..100 LOOP 
        INSERT INTO Matches (goal_home_club, goal_guest_club, id_league, id_home_club, id_guest_club) 
        VALUES ( 
            (random() * 5)::int,  -- Random goals between 0 and 5
            (random() * 5)::int, 
            (i % 10) + 1,  -- Random league from 1 to 10
            (random() * 99)::int + 1,  -- Random club from 1 to 100
            (random() * 99)::int + 1
        ); 
    END LOOP; 
END $$;