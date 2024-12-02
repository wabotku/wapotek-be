require("dotenv").config();

const express = require("express");
const knex = require("knex")(require("./knexfile").development);
const middleware = require("./middlewares/index");
const logger = require("./utils/logger");
const { MeiliSearch } = require("meilisearch");

const app = express();
app.use(express.json());

const meiliClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST,
  apiKey: process.env.MEILISEARCH_API_KEY,
});

app.locals.db = knex;
app.locals.meiliClient = meiliClient;

// Routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

app.use(
  "/api/users",
  userRoutes,
  middleware.printForwardRequestResponse,
  middleware.recordHit
);

app.use(
  "/api/products",
  productRoutes,
  middleware.printForwardRequestResponse,
  middleware.recordHit
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.verbose(`wapotek listening at PORT : ${PORT}`);
});
