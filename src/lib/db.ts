import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || '',
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Use this if you're on a local dev machine
  },
};

export async function executeQuery(query: string) {
  let pool: sql.ConnectionPool | null = null;
  try {
    pool = await sql.connect(config);
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw err;
  } finally {
    if (pool) await pool.close();
  }
}
