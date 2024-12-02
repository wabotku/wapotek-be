const httpRes = require("../../../utils/httpRes");
const logger = require("../../../utils/logger");

exports.read = async (req) => {
  let response = {
    status: httpRes.HTTP_INTERNAL_SERVER_ERROR,
    result: [],
  };

  try {
    let limit = req.body.limit ?? 10;
    let offset = req.body.offset ?? 0;
    // const meiliClient = req.app.locals.meiliClient;

    // let listProductSearch = await meiliClient
    //   .index("products")
    //   .search(req.body.name, {
    //     limit: req.body.limit ?? 10,
    //     offset: req.body.offset ?? 0,
    //   });
    // let listUuidProduct = [];

    // for (let val of listProductSearch["hits"]) {
    //   listUuidProduct.push(val["uuid"]);
    // }

    const db = req.app.locals.db;
    let query = db("products")
      .select("*")
      .orderBy("name")
      .limit(limit)
      .offset(offset);

    if(req.body.name){
      query.whereRaw("similarity(name, ? ) > ?", [req.body.name, 0.01]);
    }

    let data = await query;

    response = {
      status: httpRes.HTTP_OK,
      result: data,
    };
  } catch (error) {
    logger.error(error.message);
  }

  return response;
};
