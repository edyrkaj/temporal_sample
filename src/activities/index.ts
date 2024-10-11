import axios from 'axios';
import { getData } from './records.activity';

const url = 'http://localhost:9999';

export async function getGreeting(name: string): Promise<string> {
  const response = await axios.get(`${url}/get-greeting?name=${name}`);
  return response.data;
}

// CASE: read directly from the SQL DB Postgres
export async function getDBRows(tableName: string): Promise<any[]> {
  const response = await getData(tableName);
  return response;
}
