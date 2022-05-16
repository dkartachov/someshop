import { db } from '../db/index.js';
import { Router } from "express";
import { Product } from '../models/Product.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM product ORDER BY product_id DESC');
        const products = [];

        rows.forEach(row => {
            products.push(Product(row));
        });

        res.json(products);
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
        const { rows } = await db.query('SELECT * FROM product WHERE product_id = $1', [id]);

        if (!rows.length) throw Error(`Product with id ${id} does not exist.`);

        res.json(Product(rows[0]));
    } catch(e) {
        let message = `Error getting product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        description,
        inventory,
        price,
    } = req.body;

    const sql = 'INSERT INTO product (name, description, inventory, price) VALUES ($1, $2, $3, $4) RETURNING *';

    try {
        const { rows } = await db.query(sql, [name, description, inventory, price]);
    
        res.status(200).json(Product(rows[0]));
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

export default router;