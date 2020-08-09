const apiUsersRouter = require('express').Router();
const UserModel = require('../models/user.js');

apiUsersRouter.get('/users', (req, res) => {
  UserModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

apiUsersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  UserModel.findById(id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
});

apiUsersRouter.post('/users', (req, res) => {
  const { name, about, avatar } = req.body;

  UserModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

apiUsersRouter.patch('/users/me', (req, res) => {
  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

apiUsersRouter.patch('/users/me/avatar', (req, res) => {
  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
});

module.exports = apiUsersRouter;
