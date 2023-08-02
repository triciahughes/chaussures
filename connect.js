const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./inventory.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

db.serialize(() => {
  // Create the products table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      brand TEXT,
      price REAL,
      img TEXT,
      thumbnail TEXT
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created products table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM products`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from products");

        // Insert new data into the products table
        const images1 = [
          "/inventory/item1/item1A.svg",
          "/inventory/item1/item1B.svg",
          "/inventory/item1/item1C.svg",
        ];
        const values1 = [
          'Out Of Office "Ooo" sneakers',
          "Off-White",
          775,
          images1.join(","),
          "/inventory/item1/thumbnail/item1thumbnail.svg",
        ];

        const images2 = [
          "/inventory/item2/item2A.svg",
          "/inventory/item2/item2B.svg",
          "/inventory/item2/item2C.svg",
        ];
        const values2 = [
          "Nike Gamma Force",
          "Nike",
          200,
          images2.join(","),
          "/inventory/item2/thumbnail/item2thumbnail.svg",
        ];

        const images3 = [
          "/inventory/item3/item3A.svg",
          "/inventory/item3/item3B.svg",
          "/inventory/item3/item3C.svg",
        ];
        const values3 = [
          "Cosmic Unity 3",
          "Nike",
          160,
          images3.join(","),
          "/inventory/item3/thumbnail/item3thumbnail.svg",
        ];

        const images4 = [
          "/inventory/item4/item4A.svg",
          "/inventory/item4/item4B.svg",
          "/inventory/item4/item4C.svg",
        ];
        const values4 = [
          "DAILY 3.0 SHOES",
          "adidas",
          98.23,
          images4.join(","),
          "/inventory/item4/thumbnail/item4thumbnail.svg",
        ];

        const insertSql = `INSERT INTO products(name, brand, price, img, thumbnail) VALUES(?, ?, ?, ?, ?)`;

        db.run(insertSql, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID;
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values3, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        db.run(insertSql, values4, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted, ID ${id}`);
        });

        // Close the database connection after all insertions are done
        // db.close((err) => {
        //   if (err) {
        //     return console.error(err.message);
        //   }
        //   console.log("Closed the database connection.");
        // });
      });
    }
  );

  // create cart table if one doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS cart(
      id INTEGER PRIMARY KEY,
      name TEXT,
      brand TEXT,
      price REAL,
      thumbnail TEXT,
      quantity INTEGER
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created cart table.");
    }
  );

  // const insertSqlCart = `INSERT INTO cart(name, brand, price, img, thumbnail, quantity) VALUES(?, ?, ?, ?, ?, ?)`;

  // const defaultValues = ["", "", 0.0, "", "", 0];

  // db.run(insertSqlCart, function (err) {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   const id = this.lastID; // get the id of the last inserted row
  //   console.log(`Rows inserted, ID ${id}`);
  // });

  // Clear the existing data in the cart table
  // db.run(`DELETE FROM cart`, (err) => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //   console.log("All rows deleted from cart");
  // });
});
