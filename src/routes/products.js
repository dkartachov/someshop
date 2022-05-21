import { db } from '../db/index.js';
import { Router } from "express";
import { get, create, deleteOne } from '../db/queries.js';
import fs from 'fs';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await get('product');

        res.status(200).json(products);
    } catch(e) {
        let message = `Error getting products: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await get('product', id);

        if (!product) throw Error(`Product with id ${id} does not exist.`);

        res.status(200).json(product);
    } catch(e) {
        let message = `Error getting product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.post('/', async (req, res) => {
    const { body } = req;
    const params = {
        name: body.name,
        description: body.description,
        inventory: body.inventory,
        price: body.price,
    };

    try {
        const product = await create('product', params);
    
        res.status(200).json(product[0]);
    } catch (e) {
        let message = `Error updating product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const options = [];

    Object.keys(body).forEach(prop => {
        options.push(`${prop} = '${body[prop]}'`);
    });

    try {
        if (!options.length) throw Error('no columns to update');

        let sql = 'UPDATE product SET ';
        sql += `${options.join(', ')} WHERE product_id = ${id}`;
        sql += ' RETURNING *';

        const { rows } = await db.query(sql);

        if (!rows.length) throw Error(`Product with id ${id} does not exist.`);

        res.json(rows[0]);
    } catch (e) {
        let message = `Error updating product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await deleteOne('product', id);

        res.status(200).json(`product id = ${id} deleted`);
    } catch (e) {
        let message = `Error deleting product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.patch('/upload/:id', async (req, res) => {
    const { id } = req.params;
    const { file } = req.files;
    const path = file.tempFilePath;
    const size = file.size;

    try {
        fs.readFile(path, async (err, data) => {
            if (err) throw Error();

            await db.query('UPDATE product SET image = $1 WHERE product_id = $2', [data, id]);
        });

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(500);   
    }
});

export default router;