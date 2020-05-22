import { Schema, SchemaTypes, model } from "mongoose";

const ListSchema = Schema({
  _id: SchemaTypes.ObjectId,
  title: { type: String, required: true },
  items: [{ type: SchemaTypes.ObjectId, ref: "Item" }],
});

export const List = model("List", ListSchema);
