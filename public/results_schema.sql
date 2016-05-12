DROP TABLE IF EXISTS results;

CREATE TABLE results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL UNIQUE,
  task INT NOT NULL,
  score INT NOT NULL
);

INSERT INTO results (user, task, score) 
VALUES (
  'demo', 
  1,
  10
);
