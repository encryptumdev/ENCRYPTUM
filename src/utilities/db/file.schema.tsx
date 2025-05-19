import { Schema, model, models } from "mongoose";

export interface IFile {
  hash: string;
  sliced: string;
  legal: string;
}

export type CreateFile = {
  hash: string;
  sliced: string;
  legal: string;
};

const FileSchema = new Schema<IFile>(
  {
    hash: String,
    sliced: String,
    legal: String,
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

const File = models.File || model("File", FileSchema);
export default File;
