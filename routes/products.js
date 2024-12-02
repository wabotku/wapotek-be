const express = require("express");
const router = express.Router();

const controller = require("../controllers/v1/index");

router.post("/", controller.productController.read);
router.get("/", controller.productController.read);
router.put("/", controller.productController.read);
router.delete("/", controller.productController.read);


// router.get("/", async (req, res) => {
//   const meiliClient = req.app.locals.meiliClient;
//   let listProductSearch = await meiliClient
//     .index("products")
//     .search(req.body.name, {
//       limit: req.body.limit ?? 10,
//       offset: req.body.offset ?? 0,
//     });
//   let listUuidProduct = [];

//   for (let val of listProductSearch["hits"]) {
//     listUuidProduct.push(val["uuid"]);
//   }

//   const db = req.app.locals.db;
//   const products = await db("products")
//     .select("*")
//     .whereIn("uuid", listUuidProduct);

//   console.log(products);
  
//   res.json(products ?? {data:'takde'});
// });

// router.post("/", async (req, res) => {
//   try {
//     const db = req.app.locals.db;
//     const meiliClient = req.app.locals.meiliClient;

//     const { name, description, price } = req.body;
//     const [data] = await db("products")
//       .insert({ name, description, price })
//       .returning("*");
//     await meiliClient
//       .index("products")
//       .addDocuments([
//         { uuid: data.uuid, name: data.name, description: data.description },
//       ]);

//     res.status(201).json({ data });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });

// router.put("/:id", async (req, res) => {
//   const db = req.app.locals.db;
//   const meiliClient = req.app.locals.meiliClient;

//   const { id } = req.params;
//   const { name, description, price } = req.body;

//   await db("products").where({ id }).update({ name, description, price });
//   await meiliClient
//     .index("products")
//     .updateDocuments([{ id, name, description, price }]);

//   res.json({ id });
// });

// router.delete("/:id", async (req, res) => {
//   const db = req.app.locals.db;
//   const meiliClient = req.app.locals.meiliClient;

//   const { id } = req.params;

//   await db("products").where({ id }).del();
//   await meiliClient.index("products").deleteDocument(id);

//   res.status(204).send();
// });

module.exports = router;
