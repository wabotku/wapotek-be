const httpRes = require("../../../utils/httpRes");
const model = require("../../../models/v1/index")

exports.read = async (req, res, next) => {
  let response = {
    rc: httpRes["HTTP_BADREQUEST"],
    rd: httpRes[httpRes.HTTP_BADREQUEST],
    data: [],
  };

  try {
    let result = await model.productModel.read(req, res);

    if (result["status"]) {
      response = {
        rc: httpRes.HTTP_OK,
        rd: httpRes[httpRes.HTTP_OK],
        data: result["result"],
      };
    }

    res.locals.status = response["rc"];
    res.locals.response = JSON.stringify(response);
  } catch (error) {
    res.locals.status = response["rc"];
    res.locals.response = JSON.stringify(error);
  }

  next();
};
