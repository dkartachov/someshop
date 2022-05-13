import { db } from '../db/index.js';
import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM product');

        res.json(rows);
    } catch(e) {
        console.error(e);

        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM product WHERE product_id = $1', [id]);

        res.json(rows[0]);
    } catch(e) {
        console.error(`Error: ${e.message}`);

        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    const {
        name,
        description,
        inventory,
        price,
    } = req.body;

    const sql = 'INSERT INTO product (name, description, inventory, price) VALUES ($1, $2, $3, $4)';

    try {
        await db.query(sql, [name, description, inventory, price]);
    
        res.sendStatus(200);
    } catch (e) {
        console.log(`Error processing query: '${sql}'`);
        console.error(`Reason: ${e.message}`);

        res.sendStatus(500);
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

        res.json(rows[0]);
    } catch (e) {
        let message = `Error updating product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

export default router;