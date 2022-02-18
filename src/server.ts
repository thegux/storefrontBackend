import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

const app: express.Application = express();
const address = 'localhost:3000';

const corsOptions = {
	origin: 'https://localhost:3000',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(3000, function () {
	console.log(`starting app on: https:/${address}`);
});

export default app;
