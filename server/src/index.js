import express from "express";
import path from 'path';
import product from './routes/product.js';

const PORT = 3001;
const dirname = `${path.resolve()}/public`;
const app = express();

app.use(express.json(), express.static(path.join(path.resolve(), 'build')));
app.use('/product', product);

console.log(`Listening on port ${PORT}...`);

app.listen(PORT);