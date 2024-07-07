const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger.config");
const userRoutes = require("./routes/user.routes");
const gameRoutes = require("./routes/game.routes");
const scoreRoutes = require("./routes/score.routes");

const errorMiddleware = require("./middleware/error.middleware");
const loggerMiddleware = require("./middleware/logger.middleware");
const rbacMiddleware = require("./middleware/rbac.middleware");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/scores", scoreRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);
app.use(rbacMiddleware);
app.use(loggerMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
