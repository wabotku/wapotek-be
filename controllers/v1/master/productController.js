const httpRes = require("../../../utils/httpRes");
const model = require("../../../models/v1/index");
const logger = require("../../../utils/logger");

exports.read = async (req, res, next) => {
  let response = {
    rc: httpRes["HTTP_BADREQUEST"],
    rd: httpRes[httpRes.HTTP_BADREQUEST],
    data: [],
  };

  try {
    let result = await model.productModel.read(req);

    if (result["status"] == httpRes.HTTP_OK) {
      response = {
        rc: httpRes.HTTP_OK,
        rd: httpRes[httpRes.HTTP_OK],
        data: result["result"],
      };
    }

    res.locals.status = result["status"];
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    res.locals.status = response["rc"];
    res.locals.response = JSON.stringify(response);
    response["data"] = error.message;

    logger.error(response);
  }

  next();
};
