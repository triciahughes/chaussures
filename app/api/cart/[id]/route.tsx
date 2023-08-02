import { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
let db: Database<sqlite3.Database, sqlite3.Statement>;

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the [id].tsx API Cart GETONE route");

  const reqUrl = req.url as string;

  const id = reqUrl.split("/").pop();

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const item = await db.get(`SELECT * FROM cart WHERE id = ?`, id);

  if (!item) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the [id].tsx API Cart UPDATE ONE route");

  const reqUrl = req.url as string;
  const id = reqUrl.split("/").pop();

  const { quantity } = await req.json();
  console.log(quantity);

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const item = await db.get(`SELECT * FROM cart WHERE id = ?`, id);

  if (!item) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  await db.run(`UPDATE cart SET quantity = ? WHERE id = ?`, quantity, id);

  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  console.log("Reached the [id].tsx API Cart GETONE route");

  const reqUrl = req.url as string;

  const id = reqUrl.split("/").pop();

  if (!db) {
    db = await open({
      filename: "./inventory.db",
      driver: sqlite3.Database,
    });
  }

  const item = await db.get(`SELECT * FROM cart WHERE id = ?`, id);

  if (!item) {
    return new Response(JSON.stringify({ message: "Product not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  await db.run(`DELETE FROM cart WHERE id = ?`, id);

  return new Response(JSON.stringify(item), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
