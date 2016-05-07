DROP TABLE IF EXISTS results;

CREATE TABLE results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  score INT NOT NULL
);

INSERT INTO results (name, score) 
VALUES (
  'demo', 
  10
);
