import { db } from '../db/index.js';
import { Router } from "express";
import { Customer } from '../models/Customer.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM customer ORDER BY customer_id DESC');
        const customers = [];

        rows.forEach(row => {
            customers.push(Customer(row));
        })

        res.status(200).json(customers);
    } catch(e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM customer WHERE customer_id = $1', [id]);

        if (!rows.length) throw Error(`Product with id ${id} does not exist.`);

        res.json(Customer(rows[0]));
    } catch(e) {
        let message = `Error getting product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.post('/', async (req, res) => {
    const {
        first_name,
        last_name,
        email,
        phone_number,
    } = req.body;

    const sql = 'INSERT INTO customer (first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4)';

    try {
        await db.query(sql, [first_name, last_name, email, phone_number]);
    
        res.sendStatus(200);
    } catch (e) {
        let message = `Error creating product: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

export default router;