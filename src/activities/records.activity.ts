

import postgres from 'postgres';

require('dotenv').config();

async function getData(tableName: string): Promise<any[]> {
  const client = postgres({
    db: process.env.PG_DB,
    host: '127.0.0.1',
    port: 5432,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    keep_alive: 1
  });

  try {
    const data =  await client`SELECT symbol FROM fiat LIMIT 10`;
    return data;
  } catch (error) {
    await client.CLOSE;
    return [];
  }
}

export async function getRecords(tableName: string): Promise<any[]> {
  const response = await getData(tableName);
  return response;
}
