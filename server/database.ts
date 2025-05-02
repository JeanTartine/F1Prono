import pg from 'pg';
const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    database: 'postgres',
    password: 'toto123',
    port: 5432,
})

export default pool;