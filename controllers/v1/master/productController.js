const httpRes = require("../../../utils/httpRes");
const model = require("../../../models/v1/index");
const logger = require("../../../utils/logger");

exports.create = async (req, res, next) => {
  let response = {
    rc: httpRes.HTTP_BAD_REQUEST,
    rd: httpRes[httpRes.HTTP_BAD_REQUEST],
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

exports.read = async (req, res, next) => {
  let response = {
    rc: httpRes.HTTP_BAD_REQUEST,
    rd: httpRes[httpRes.HTTP_BAD_REQUEST],
    data: [],
  };

  try {
    let result = await model.productModel.read(req);

    response = {
      rc: result["status"],
      rd: httpRes[result["status"]],
      data: result["result"],
    };
  } catch (error) {
    let err = response;
    err["data"] = error.message;

    logger.error(err);
  }

  res.locals.status = response["rc"];
  res.locals.response = JSON.stringify(response);

  next();
};

exports.update = async (req, res, next) => {
  let response = {
    rc: httpRes.HTTP_BAD_REQUEST,
    rd: httpRes[httpRes.HTTP_BAD_REQUEST],
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

exports.delete = async (req, res, next) => {
  let response = {
    rc: httpRes.HTTP_BAD_REQUEST,
    rd: httpRes[httpRes.HTTP_BAD_REQUEST],
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
