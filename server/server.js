/* eslint-disable import/no-extraneous-dependencies */
/* credit: Olawale Aladeusi */
import express from 'express';
import bodyParser from 'body-parser';
import Epicmail from './src/controllers/controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors';

const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ // Middleware
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use(cors());

app.get('/', (req, res) => res.status(200).send({ message: 'YAY! Congratulations! Your first endpoint is working' }));
app.post('/api/v1/auth/signup', Epicmail.createAUser);
app.post('/api/v1/auth/login', Epicmail.login);
app.post('/api/v1/messages/createMessage', Epicmail.sendMessage);
app.get('/api/v1/messages/allMessagesPerUser/:id', Epicmail.getAllMessagesPerUser);
app.get('/api/v1/messages/getAMessage/:id', Epicmail.getAMessage);
app.get('/api/v1/messages/unreadMessagesPerUser/:id', Epicmail.getUnreadMessagesPerUser);
app.get('/api/v1/messages/getMessagesSentByAUser/:id', Epicmail.getMessagesSentByAUser);
app.get('/api/v1/users/:id', Epicmail.getOneUser);
app.delete('/api/v1/messages/deleteAMessage/:id', Epicmail.deleteAMessage);

/* when the function is called, it should listen on a port */
/* To automatically pick port on the server instead of usin a single port */
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on ${port}`));

export default app;