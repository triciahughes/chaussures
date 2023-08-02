import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the cart.tsx API GET route");

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const cart = await db.all(`SELECT * FROM cart`);

  if (!cart) {
    return new Response(JSON.stringify({ message: "Cart not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify(cart), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the cart.tsx API Post route");

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const { name, brand, price, thumbnail, quantity } = await req.json();

  await db.run(
    `INSERT INTO cart(name, brand, price, thumbnail, quantity) VALUES(?, ?, ?, ?, ?)`,
    name,
    brand,
    price,
    thumbnail,
    quantity
  );

  return new Response(JSON.stringify({ message: "cart updated" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
