CREATE TABLE IF NOT EXISTS results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user TEXT NOT NULL,
  task INT NOT NULL,
  score INT NOT NULL,
  svg TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS survey (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  surname TEXT NOT NULL,
  software TEXT NOT NULL,
  difficulties TEXT,
  browser TEXT NOT NULL,
  issues TEXT,
  difficulty TEXT NOT NULL,
  traced TEXT NOT NULL,
  time TEXT NOT NULL
);
