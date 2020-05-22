import React, { useState, useEffect } from "react";
import AppLayout from "../templates/AppLayout";
import Form from "../organisms/Form";
import EditableBox from "../molecules/EditableBox";
import { useGetJSON, useSendJSON } from "../http";
import Loading from "../atoms/Loading";

const ListsPage = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getListsJSON, abortGetListsJSON] = useGetJSON();
  const [createListJSON, abortCreateListJSON] = useSendJSON();
  const [deleteListJSON, abortDeleteListJSON] = useSendJSON();
  const [updateListJSON, abortUpdateListJSON] = useSendJSON();

  useEffect(() => {
    getListsJSON("/lists")
      .then(({ lists: fetchedLists }) => {
        setLists(fetchedLists);
        setLoading(false);
      })
      .catch((error) => console.log(error));
    return () => abortGetListsJSON();
  }, []);

  useEffect(() => {
    return () => {
      abortCreateListJSON();
      abortDeleteListJSON();
      abortUpdateListJSON();
    };
  }, []);

  const createList = (title) => {
    createListJSON("/lists", { method: "POST", body: { title } })
      .then(({ list }) => setLists([...lists, list]))
      .catch(console.log);
  };

  const deleteList = (listId) => {
    const filterLists = (list) => list.listId !== listId;

    deleteListJSON(`/lists/${listId}`, { method: "DELETE" })
      .then(() => setLists(lists.filter(filterLists)))
      .catch(console.log);
  };

  const updateList = async (listId, title) => {
    const updateList = (list, updatedList) =>
      list.listId === updatedList.listId ? updatedList : list;

    try {
      const { list: updatedList } = await updateListJSON(`/lists/${listId}`, {
        method: "PATCH",
        body: { title },
      });
      setLists(lists.map((list) => updateList(list, updatedList)));
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => (
    <Form onSubmit={createList} buttonText="Create new list" />
  );

  const renderListBoxes = () =>
    lists.map(({ listId, title, items }) => (
      <EditableBox
        key={listId}
        id={listId}
        counter={items}
        title={title}
        onDelete={deleteList}
        onEdit={updateList}
        withLink
      />
    ));

  return loading ? (
    <Loading />
  ) : (
    <AppLayout
      pageTitle="Your lists 🤓"
      boxesSlot={renderListBoxes()}
      formSlot={renderForm()}
    />
  );
};

export default ListsPage;
