function addListItem(_, item, setList) {
  setList(list => ({...list, items: [
    ...list.items, item,
  ]}));
}

function editListItem(e, item, setList) {
  e.persist();
  const key = item._id;
  setList(list => ({
    ...list, 
    items: list.items.map(el => el._id === key ? { ...el, itemDescription: e.target.value } : el)
  }));
}

function toggleEditionItem(_, itemId, setList) {
  setList(list => ({
    ...list, 
    items: list.items.map(el => el._id === itemId ? { ...el, inEdition: !el.inEdition } : el)
  }));
}

function deleteListItem(_, itemId, setList) {
  setList(list => ({
    ...list,
    items: list.items.filter(item => item._id !== itemId),
  }));
}

export {
  addListItem,
  editListItem,
  toggleEditionItem,
  deleteListItem,
}