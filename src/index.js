import express from "express";
import cors from 'cors';
import path from 'path';
import products from './routes/products.js';
import customers from './routes/customers.js'

const build = 'clientbuild';
const dirname = path.resolve();
const app = express();

// config
app.use(cors(), express.json(), express.static(path.join(dirname, build)));

// routes
app.use('/api/products', products);
app.use('/api/customers', customers);

// send client build
app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, build, 'index.html'), (err) => {
        if (err) {
            res.send('Hello!');
        }
    });
});

console.log(`Listening on port ${process.env.PORT}...`);

app.listen(process.env.PORT);