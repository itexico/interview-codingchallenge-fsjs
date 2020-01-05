import mongoose from "mongoose";
import { ListModel } from "../../types/types";

const List = new mongoose.Schema<ListModel>({
    name: { type: String, required: true, unique: true, minLength: 3, maxLength: 20 },
});

export const ListSchema = mongoose.model<ListModel>("List", List);
