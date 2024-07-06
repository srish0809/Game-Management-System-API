const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger.config');
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const scoreRoutes = require('./routes/score.routes');

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/games', gameRoutes);
app.use('/scores', scoreRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
