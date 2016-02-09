import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'

const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/static'));

app.use('/api', routes);

export default app;
