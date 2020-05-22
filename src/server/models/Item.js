import { Schema, SchemaTypes, model } from "mongoose";

const ItemSchema = Schema({
  _id: SchemaTypes.ObjectId,
  title: { type: String, required: true },
  list: { type: SchemaTypes.ObjectId, ref: "List" },
});

export const Item = model("Item", ItemSchema);
