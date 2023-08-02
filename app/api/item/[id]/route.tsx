import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the [id].tsx API route");

  const reqUrl = req.url as string;

  const id = reqUrl.split("/").pop();

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const product = await db.get(`SELECT * FROM products WHERE id = ?`, id);

  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify(product), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the [id].tsx API route");

  const reqUrl = req.url as string;

  const id = reqUrl.split("/").pop();

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const { quantity } = await req.json();

  console.log(quantity);

  await db.run(`UPDATE products SET quantity = ? WHERE id = ?`, quantity, id);

  return new Response(JSON.stringify({ message: "Product updated" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
