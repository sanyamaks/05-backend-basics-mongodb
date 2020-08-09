const express = require('express');
const path = require('path');
const apiCardsRouter = require('./routes/apiCardsRouter.js');
const apiUsersRouter = require('./routes/apiUsersRouter.js');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { PORT } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', apiCardsRouter);
app.use('/', apiUsersRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
