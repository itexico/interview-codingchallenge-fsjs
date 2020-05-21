export const LIST_NOT_FOUND_ERROR = "LIST_NOT_FOUND_ERROR";
export const INVALID_LIST_ID_ERROR = "INVALID_LIST_ID_ERROR";
export const INVALID_LIST_TITLE_ERROR = "INVALID_LIST_TITLE_ERROR";

export const mapSuccessListResponse = (docs) => {
  const getObject = (doc) => ({
    listId: doc._id,
    title: doc.title,
    items: doc.items.length,
  });

  return docs instanceof Array
    ? { lists: docs.map(getObject) }
    : { list: getObject(docs) };
};

export const mapErrorListResponse = (type) => {
  switch (type) {
    case LIST_NOT_FOUND_ERROR:
    case INVALID_LIST_ID_ERROR:
      return {
        error: {
          type: LIST_NOT_FOUND_ERROR,
          message: "List Not Found.",
        },
      };
    case INVALID_LIST_TITLE_ERROR:
      return {
        error: {
          type: INVALID_LIST_TITLE_ERROR,
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
