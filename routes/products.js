const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const meiliClient = req.app.locals.meiliClient;
  const index = await meiliClient.index("products").search(""); // This returns an Index instance
  console.log(index);

  // const searchResults = await index.search("Product", {
  //   limit: 10, // Optional: Limit results
  // });
  // console.log("Search results:", searchResults);

  // const info = await index.getRawInfo();
  // console.log("Index info:", info);

  const db = req.app.locals.db;
  const products = await db("products").select("*");
  res.json(products);
});

router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const meiliClient = req.app.locals.meiliClient;

  const { name, description, price } = req.body;
  //   const [id] = await db('products').insert({ name, description, price });
  // const [product] = await db("products")
  //   .insert({ name, description, price })
  //   .returning("*");

  const id = 1000; // Ambil ID produk yang baru dibuat

  //   const indexExists = await meiliClient
  //     .index("products")
  //     .getRawInfo()
  //     .catch(() => null);

  if (!indexExists) {
    await meiliClient.createIndex("products", { primaryKey: "id" });
  }

  await meiliClient
    .index("products")
    .addDocuments([{ id, name, description, price }]);

  //   try {
  //     await meiliClient
  //       .index("products")
  //       .addDocuments([{ id, name, description, price }]);
  //   } catch (error) {
  //     await meiliClient.createIndex("products", { primaryKey: "id" });
  //     //  await meiliClient
  //     //    .index("products")
  //     //    .addDocuments([{ id, name, description, price }]);
  //   }

  res.status(201).json({ id });
});

router.put("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const meiliClient = req.app.locals.meiliClient;

  const { id } = req.params;
  const { name, description, price } = req.body;

  await db("products").where({ id }).update({ name, description, price });
  await meiliClient
    .index("products")
    .updateDocuments([{ id, name, description, price }]);

  res.json({ id });
});

router.delete("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const meiliClient = req.app.locals.meiliClient;

  const { id } = req.params;

  await db("products").where({ id }).del();
  await meiliClient.index("products").deleteDocument(id);

  res.status(204).send();
});

module.exports = router;
