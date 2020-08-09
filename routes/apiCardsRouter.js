const apiCardsRouter = require('express').Router();
const CardModel = require('../models/card');

apiCardsRouter.get('/cards', (req, res) => {
  CardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => req.status(500).send({ message: 'Нет пользователя с таким id' }));
});

apiCardsRouter.get('/cards/:cardId', (req, res) => {
  const { id } = req.params;

  CardModel.findById(id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
});

apiCardsRouter.post('/cards', (req, res) => {
  const { name, link } = req.body;

  CardModel.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

apiCardsRouter.put('/cards/:cardId/likes', (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

apiCardsRouter.delete('/cards/:cardId/likes', (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

module.exports = apiCardsRouter;
