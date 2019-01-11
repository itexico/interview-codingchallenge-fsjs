import axios from "axios";
const apiRoute = "listsApp";
const port = 5000;

export function readItems(listId) {
  return axios
    .get(`http://localhost:${port}/${apiRoute}/items/${listId}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data.allItems)
    .catch(err => console.log(err));
}

export function createItem(title, listId) {
  return axios
    .post(
      `http://localhost:${port}/${apiRoute}/item/${listId}`,
      { title: title },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

export function readItem(id) {
  axios
    .get(`http://localhost:${port}/${apiRoute}/item/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data.item)
    .catch(err => console.log(err));
}

export function updateItem(id, newTitle) {
  return axios
    .put(
      `http://localhost:${port}/${apiRoute}/item/${id}`,
      { title: newTitle },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

export function deleteItem(id) {
  return axios
    .delete(`http://localhost:${port}/${apiRoute}/item/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
