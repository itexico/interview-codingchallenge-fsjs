import { Mongoose } from "mongoose";
import { ItemModel } from "../../types/types";

export function itemsFactory (mongoose: Mongoose) {
    const item = new mongoose.Schema<ItemModel>({
        name: { type: String, required: true, unique: true, minLength: 3, maxLength: 20 },
    });

    return mongoose.model<ItemModel>("Item", item);
}
