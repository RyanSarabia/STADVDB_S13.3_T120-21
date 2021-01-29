CREATE TABLE actorFullName AS
SELECT CONCAT(first_name, ' ', last_name) AS full_name, id
FROM actors;

CREATE TABLE directorFullName AS
SELECT CONCAT(first_name, ' ', last_name) AS full_name, id
FROM directors;

CREATE INDEX fullname ON actorfullname(full_name);
CREATE INDEX fullname ON directorfullname(full_name);
CREATE INDEX year ON movies (YEAR);
CREATE INDEX name ON movies (NAME);
CREATE INDEX role ON roles (role);s
CREATE INDEX id ON directors (id);
CREATE INDEX id ON actors (id);
CREATE INDEX genres ON movies_genres (genre);

OPTIMIZE TABLE movies;
OPTIMIZE TABLE actorfullname;
OPTIMIZE TABLE directorfullname;
OPTIMIZE TABLE roles;
OPTIMIZE TABLE directors;
OPTIMIZE TABLE actors;
OPTIMIZE TABLE movies_genres;