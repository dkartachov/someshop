import express from "express";
import path from 'path';
import product from './routes/product.js';

const dirname = `${path.resolve()}/public`;
const app = express();

app.use(express.json(), express.static(dirname));
app.use('/product', product);

app.get('/', async (req, res) => {
    res.sendFile(path.join(dirname, '/index.html'));
});


console.log('Listening on port 3000...');

app.listen(3000);