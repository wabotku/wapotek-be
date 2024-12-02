const logger = require("../../../utils/logger");

exports.read = async (req, res) => {
  let response = {
    status: false,
    result: [],
  };
  
  try {
    const meiliClient = req.app.locals.meiliClient;
    
    let listProductSearch = await meiliClient
      .index("products")
      .search(req.body.name, {
        limit: req.body.limit ?? 10,
        offset: req.body.offset ?? 0,
      });
    let listUuidProduct = [];

    for (let val of listProductSearch["hits"]) {
      listUuidProduct.push(val["uuid"]);
    }

    const db = req.app.locals.db;
    const products = await db("products")
      .select("*")
      .whereIn("uuid", listUuidProduct);

    response = {
      status: true,
      result: products,
    };
  } catch (error) {
   logger.error(error);
  }

  return response;
};
