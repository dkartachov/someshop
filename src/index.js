import express from "express";
import fileUpload from 'express-fileupload';
import cors from 'cors';
import path from 'path';
import products from './routes/products.js';
import customers from './routes/customers.js'

const build = 'clientbuild';
const dirname = path.resolve();
const app = express();

// config
app.use(cors(), express.json(), express.urlencoded({ extended: true }), express.static(path.join(dirname, build)));

// enable file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
    // debug: true,
}));

// routes
app.use('/api/products', products);
app.use('/api/customers', customers);

console.log(`Listening on port ${process.env.PORT}...`);

app.listen(process.env.PORT);