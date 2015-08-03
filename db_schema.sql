DROP TABLE IF EXISTS results;

CREATE TABLE results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT NOT NULL UNIQUE,
  mark INTEGER NOT NULL
);

-- sample data
INSERT INTO results (student_id, mark) 
VALUES (
  'James', 
  65
);
INSERT INTO results (student_id, mark) 
VALUES (
  'Sally', 
  73
);
