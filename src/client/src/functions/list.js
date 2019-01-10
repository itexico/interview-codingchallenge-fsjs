import axios from "axios";
const apiRoute = "listsApp";
const port = 5000;

export function readLists() {
  return axios
    .get(`http://localhost:${port}/${apiRoute}/lists`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data.allLists)
    .catch(err => console.log(err));
}

export function createList(title) {
  return axios
    .post(
      `http://localhost:${port}/${apiRoute}/list`,
      { title: title },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

export function readList(id) {
  axios
    .get(`http://localhost:${port}/${apiRoute}/list/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.data.list)
    .catch(err => console.log(err));
}

export function updateList(id, newTitle) {
  return axios
    .put(
      `http://localhost:${port}/${apiRoute}/list/${id}`,
      { title: newTitle },
      { headers: { "Content-Type": "application/json" } }
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

export function deleteList(id) {
  return axios
    .delete(`http://localhost:${port}/${apiRoute}/list/${id}`, {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
