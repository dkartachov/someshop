import { db } from '../db/index.js';
import { Router } from "express";
import { Customer } from '../models/Customer.js';
import { get, create } from '../db/queries.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const customers = await get('customer');

        res.status(200).json(customers);
    } catch(e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await get('customer', id);

        if (!customer) throw Error(`Customer with id ${id} does not exist.`);

        res.status(200).json(customer);
    } catch(e) {
        let message = `Error getting customer: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

router.post('/', async (req, res) => {
    const { body } = req;
    const params = {
        first_name: body.name?.first,
        last_name: body.name?.last,
        email: body.contact?.email,
        phone_number: body.contact?.phone,
    }

    try {
        const customer = await create('customer', params);
    
        res.status(200).json(customer);
    } catch (e) {
        let message = `Error creating customer: ${e.message}`;
        message = message.replaceAll('"', '\'');

        console.log(message);

        res.status(500).json(message);
    }
});

export default router;