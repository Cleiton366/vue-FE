import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export async function postRequestBurger(burger) {
  let req = axios.post(baseUrl+'/burgers', burger);
  return req;
}

export async function getRequestBurgers() {
  let res = axios.get(baseUrl+'/burgers');
  return res;
}

export async function updateRequestBurger(id, option) {
  let res = axios.patch(baseUrl+`/burgers/${id}`, {
    status: option
  });
  return res;
}

export async function deleteRequestBurger(id) {
  let res = axios.delete(baseUrl+`/burgers/${id}`);
  return res;
}