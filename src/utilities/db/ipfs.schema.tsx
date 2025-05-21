import { Schema, model, models } from "mongoose";

export interface IIPFS {
  cid: string;
  address: string;
  ordered: boolean;
}

const IPFSSchema = new Schema<IIPFS>(
  {
    cid: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    ordered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  }
);

const IPFS = models.IPFS || model("IPFS", IPFSSchema);
export default IPFS;
