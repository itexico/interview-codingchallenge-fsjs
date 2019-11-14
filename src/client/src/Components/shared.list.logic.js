function addListItem(_, item, setList) {
  setList(list => ({...list, items: [
    ...list.items, item,
  ]}));
}

function editListItem(e, item, setList) {
  e.persist();
  const key = item.key;
  setList(list => ({
    ...list, 
    items: list.items.map(el => el.key === key ? { ...el, itemDescription: e.target.value } : el)
  }));
}

function toggleEditionItem(_, itemKey, setList) {
  setList(list => ({
    ...list, 
    items: list.items.map(el => el.key === itemKey ? { ...el, inEdition: !el.inEdition } : el)
  }));
}

function deleteListItem(_, itemKey, setList) {
  setList(list => ({
    ...list,
    items: list.items.filter(item => item.key !== itemKey),
  }));
}

export {
  addListItem,
  editListItem,
  toggleEditionItem,
  deleteListItem,
}