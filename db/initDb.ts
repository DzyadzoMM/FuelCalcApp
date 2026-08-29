import * as SQLite from "expo-sqlite";

export function initDb() {
  const db = SQLite.openDatabaseSync("app.db");

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS refuels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      liters REAL NOT NULL,
      price REAL NOT NULL,
      distance REAL NOT NULL,       -- показ одометра
      trip_distance REAL,           -- дистанція поїздки
      consumption REAL,             -- розхід л/100 км
      total_cost REAL NOT NULL,
      date TEXT NOT NULL
    );
  `);

  return db;
}
