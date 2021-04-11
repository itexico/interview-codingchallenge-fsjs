import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    numItems: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', listSchema);

export { List };
