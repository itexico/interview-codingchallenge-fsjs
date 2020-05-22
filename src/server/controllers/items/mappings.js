export const ITEM_NOT_FOUND_ERROR = "ITEM_NOT_FOUND_ERROR";
export const INVALID_ITEM_ID_ERROR = "INVALID_ITEM_ID_ERROR";
export const INVALID_ITEM_TITLE_ERROR = "INVALID_LIST_TITLE_ERROR";

export const mapSuccessItemResponse = (docs) => {
  const getObject = (doc) => ({
    itemId: doc._id,
    listId: doc.list,
    title: doc.title,
  });

  return docs instanceof Array
    ? { items: docs.map(getObject) }
    : { item: getObject(docs) };
};

export const mapErrorItemResponse = (type) => {
  switch (type) {
    case ITEM_NOT_FOUND_ERROR:
    case INVALID_ITEM_ID_ERROR:
      return {
        error: {
          type: ITEM_NOT_FOUND_ERROR,
          message: "Item Not Found.",
        },
      };
    case INVALID_ITEM_TITLE_ERROR:
      return {
        error: {
          type: INVALID_ITEM_TITLE_ERROR,
          message: "Title must be a non-empty string.",
        },
      };
    default:
      return {
        error: {
          type: "UNKNOWN_ERROR",
          message: "Something went wrong. Please try again.",
        },
      };
  }
};
