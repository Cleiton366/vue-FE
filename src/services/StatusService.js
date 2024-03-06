import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export async function getRequestStatus() {
  let res = axios.get(baseUrl+'/status');
  return res;
}