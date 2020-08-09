const apiUsersRouter = require('express').Router();
const fs = require('fs');
const path = require('path');

apiUsersRouter.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '..', 'data', 'users.json');

  fs.promises
    .readFile(usersPath, {
      encoding: 'utf8',
    })
    .then((data) => {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(data);
    })
    .catch(() => {
      res.status(404).send({ message: 'Internal Server Error' });
    });
});

apiUsersRouter.get('/users/:id', (req, res) => {
  const usersPath = path.join(__dirname, '..', 'data', 'users.json');

  fs.promises
    .readFile(usersPath, {
      encoding: 'utf8',
    })
    .then((users) => JSON.parse(users).filter((item) => item._id === req.params.id))
    .then((searchedUser) => {
      if (searchedUser.length === 0) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(searchedUser));
    })
    .catch(() => {
      res.status(500).send({ message: 'Internal Server Error' });
    });
});

module.exports = apiUsersRouter;
