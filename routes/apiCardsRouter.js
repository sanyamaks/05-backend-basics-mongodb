const apiCardsRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

apiCardsRouter.get('/cards', (req, res) => {
  const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

  fs.promises
    .readFile(cardsPath, {
      encoding: 'utf8',
    })
    .then((data) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(data);
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Server Error' });
    });
});

module.exports = apiCardsRouter;
