import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const products = await db.all("SELECT * FROM products");

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
