import 'dotenv/config'
import Pool from "pg-pool";

const pool = new Pool();

export const db = {
    query: (sql, params) => {
        return pool.query(sql, params);
    },
    close: () => {
        pool.end();
    }
}