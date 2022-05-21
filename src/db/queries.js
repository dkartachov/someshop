import { db } from './index.js';
import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";
import { Order } from "../models/Order.js";
import fs from 'fs';
import os from 'os';
import path from 'path';

const tableModelMap = {
    'product': Product,
    'customer': Customer,
    'order': Order,
};

export const get = async (table, id = null) => {
    const queryById = id ? `WHERE ${table}_id = ${id}` : '';
    const { rows } = await db.query(`SELECT * FROM ${table} ${queryById} ORDER BY ${table}_id DESC`);

    const records = [];

    rows.forEach(row => records.push(tableModelMap[table](row)));

    return id ? records[0] : records;
}

export const create = async (table, params) => {
    const columns = `(${Object.keys(params).join(', ')})`;
    const values = `(${Object.values(params).map((param, index) => `$${index + 1}`).join(', ')})`;
    const sql = `INSERT INTO ${table} ${columns} VALUES ${values} RETURNING *`;

    const { rows } = await db.query(sql, Object.values(params));

    return tableModelMap[table](rows[0]);
}

export const deleteOne = async (table, id) => {
    const sql = `DELETE FROM ${table} WHERE ${table}_id = $1`;
    const { rowCount } = await db.query(sql, [id]);

    if (!rowCount) throw Error(`${table} id ${id} does not exist.`);
}