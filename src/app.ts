import express from 'express';
import 'dotenv/config';

const app: express.Application = express();
const PORT: string | undefined = process.env.PORT;

app.listen(PORT || '5000', () => {
    console.log(`Application is working on ${PORT}`);
});
