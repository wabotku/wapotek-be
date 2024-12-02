const httpRes = require("../../../utils/httpRes");
const logger = require("../../../utils/logger");

exports.read = async (req) => {
  let response = {
    status: httpRes.HTTP_GENERALERROR,
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
      status: httpRes.HTTP_OK,
      result: products,
    };
  } catch (error) {
    logger.error(error.message);
  }

  return response;
};
