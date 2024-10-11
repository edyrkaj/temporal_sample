import axios from "axios";

const url = 'http://localhost:9999';

export async function getGreeting(name: string): Promise<string> {
  const response = await axios.get(`${url}/get-greeting?name=${name}`);
  return response.data;
}
