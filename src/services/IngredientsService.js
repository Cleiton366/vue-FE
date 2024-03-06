import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export async function getRequestIngredients () {
  let res = axios.get(baseUrl+'/ingredients');
  return res;
}