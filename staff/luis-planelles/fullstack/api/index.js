const express = require('express');

const { registerUser, authenticateUser } = require('./logic');

const api = express();

// check conextion
api.get('/', (req, res) => {
  res.send('Hello, World!');
});

api.get('/helloworld', (req, res) => res.json({ hello: 'world' }));

// registerUser route
api.post('/users', (req, res) => {
  let json = '';

  req.on('data', (chunk) => (json += chunk));

  req.on('end', () => {
    const { name, email, password } = JSON.parse(json);

    try {
      registerUser(name, email, password, (error) => {
        if (error) {
          res.status(400).json({ error: error.message });

          return;
        }

        res.status(201).send();
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
});

// atenthicateUser route
api.post('/users/auth', (req, res) => {
  let json = '';

  req.on('data', (chunk) => (json += chunk));

  req.on('end', () => {
    try {
      const { email, password } = JSON.parse(json);

      authenticateUser(email, password, (error, userId) => {
        if (error) {
          res.status(400).json({ error: error.message });

          return;
        }

        res.json({ userId });
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
});

// userId route
api.get('/users/:userId', (req, res) => {
  try {
    const { userId } = req.params;

    retrieveUser(userId, (error, user) => {
      if (error) {
        res.status(400).json({ error: error.message });

        return;
      }

      res.json(user);
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

api.patch('/users/:userId', (req, res) => {
  let json = '';

  req.on('data', (chunk) => (json += chunk));

  req.on('end', () => {
    try {
      const { userId } = req.params;
      const { avatar } = JSON.parse(json);

      updateUserAvatar(userId, avatar, (error) => {
        if (error) {
          res.status(400).json({ error: error.message });

          return;
        }

        res.status(204).send();
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
});

api.listen(4000);
