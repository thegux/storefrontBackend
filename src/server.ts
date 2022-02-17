import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app: express.Application = express();
const address = 'localhost:3000';

app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, function () {
	console.log(`starting app on: https:/${address}`);
});

export default app;
