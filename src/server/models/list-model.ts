import { Mongoose } from "mongoose";
import { ListModel } from "../../types/types";

export function listFactory (mongoose: Mongoose) {
    const list = new mongoose.Schema<ListModel>({
        name: { type: String, required: true, unique: true, minLength: 3, maxLength: 20 },
    });

    return mongoose.model<ListModel>("List", list);
}
