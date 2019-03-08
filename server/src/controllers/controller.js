/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable no-else-return */
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/model';

const Model = {
    createAUser(req, res) {
      const user = UserModel.createUser(req.body);
        const email = req.body.email;
        if (!email || !req.body.firstName || !req.body.lastName || !req.body.password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        if (email || req.body.firstName || req.body.lastName || req.body.password) {
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: email },
            config.secret,
            { expiresIn: '24h' });
          res.json({
            status: 200,
            data:
           {
             message: `Authentication successful!. Welcome ${req.body.firstName}`,
             token: token,
           },
          });
        }
        return '';
      },
      login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const mockEmail = 't@a.com';
        const mockPassword = 'test';
        if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required' });
        }
        if (email !== mockEmail || password !== mockPassword) {
          return res.status(400).json({ message: 'Username or password is incorrect' });
        }
        if (email === mockEmail && password === mockPassword) {
          // eslint-disable-next-line prefer-const
          let token = jwt.sign({ email: email },
            config.secret,
            { expiresIn: '24h' });
          res.json({
            status: 200,
            data:
            {
              token: token,
            },
          });
        }
        return '';
      },
      sendMessage(req, res) {
        if (!req.body.subject || !req.body.message || !req.body.sender || !req.body.reciever) {
          return res.status(400).send({ message: 'All fields are required' });
        }
        const message = UserModel.sendMessage(req.body);
        return res.status(200).send(message);
      },
      getAllMessagesPerUser(req, res) {
        const message = UserModel.getAllMessagesPerUser(req.params.id);
        if (!message) {
          res.status(404).send('the email(s) are no where to be found');
        }
        const arrOfMessages = [];
        Object.values(message).forEach(i => arrOfMessages.push(i));
        res.status(200).send(Object.values(arrOfMessages));
      },
};

export default Model;