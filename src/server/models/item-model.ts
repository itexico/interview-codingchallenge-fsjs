import mongoose from "mongoose";
import { ItemModel } from "../../types/types";

const Item = new mongoose.Schema<ItemModel>({
    name: { type: String, required: true },
    description: { type: String, required: false },
    list: { type: mongoose.Schema.Types.ObjectId, required: true },
});

export const ItemSchema = mongoose.model<ItemModel>("Item", Item);
