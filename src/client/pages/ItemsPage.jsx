import React, { useState, useEffect } from "react";
import AppLayout from "../templates/AppLayout";
import Form from "../organisms/Form";
import EditableBox from "../molecules/EditableBox";
import { useGetJSON, useSendJSON } from "../http";
import { useParams } from "react-router-dom";

const ItemsPage = () => {
  const { listId } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [getListJSON, abortGetListJSON] = useGetJSON();
  const [getItemsJSON, abortGetItemsJSON] = useGetJSON();
  const [createItemJSON, abortCreateItemJSON] = useSendJSON();
  const [updateItemJSON, abortUpdateItemJSON] = useSendJSON();
  const [deleteItemJSON, abortDeleteItemJSON] = useSendJSON();

  useEffect(() => {
    getListJSON(`/lists/${listId}`)
      .then(({ list }) => setList(list))
      .catch((error) => console.log(error));

    getItemsJSON(`/lists/${listId}/items`)
      .then(({ items }) => setItems(items))
      .catch((error) => console.log(error));

    return () => {
      abortGetListJSON();
      abortGetItemsJSON();
    };
  }, []);

  useEffect(() => {
    return () => {
      abortCreateItemJSON();
      abortUpdateItemJSON();
      abortDeleteItemJSON();
    };
  }, []);

  const createItem = (title) => {
    createItemJSON(`/lists/${listId}/items`, {
      method: "POST",
      body: { title },
    })
      .then(({ item }) => setItems([...items, item]))
      .catch(console.log);
  };

  const deleteItem = (itemId) => {
    const filterItems = (item) => item.itemId !== itemId;

    deleteItemJSON(`/items/${itemId}`, { method: "DELETE" })
      .then(() => setItems(items.filter(filterItems)))
      .catch(console.log);
  };

  const updateItem = async (itemId, title) => {
    const updateItem = (item, updatedItem) =>
      item.itemId === updatedItem.itemId ? updatedItem : item;

    try {
      const { item: updatedItem } = await updateItemJSON(`/items/${itemId}`, {
        method: "PATCH",
        body: { title },
      });
      setItems(items.map((item) => updateItem(item, updatedItem)));
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => (
    <Form onSubmit={createItem} buttonText="Add new item" />
  );

  const renderItemBoxes = () =>
    items.map(({ itemId, title }) => (
      <EditableBox
        key={itemId}
        id={itemId}
        counter={null}
        title={title}
        onDelete={deleteItem}
        onEdit={updateItem}
      />
    ));

  return (
    <AppLayout
      pageTitle={list.title}
      boxesSlot={renderItemBoxes()}
      formSlot={renderForm()}
    />
  );
};

export default ItemsPage;
