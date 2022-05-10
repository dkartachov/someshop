import Pool from "pg-pool";

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'denpol',
    database: 'someshop',
});

export const db = {
    query: (sql, params) => {
        return pool.query(sql, params);
    },
    close: () => {
        pool.end();
    }
}