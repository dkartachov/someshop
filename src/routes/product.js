import { db } from '../db/index.js';
import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM product');

        res.json(rows);
    } catch(e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM product WHERE product_id = $1', [id]);

        res.json(rows[0]);
    } catch(e) {
        console.error(`Error: ${e.message}`);
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

export default router;