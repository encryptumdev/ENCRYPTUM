import CloseIcon from "@/assets/icons/close-icon";
import UploadIcon from "@/assets/icons/upload-icon";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { keccak256 } from "js-sha3";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ModalUploadProps {
  isOpen: boolean;
  onClose(value: boolean): void;
  onUploaded(value: any): void;
  legal: string;
}

const ModalUpload: FC<ModalUploadProps> = ({
  isOpen,
  onClose,
  onUploaded,
  legal,
}) => {
  // ** HASHING RESULT
  const [, setHashResult] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [base64String, setBase64String] = useState<any>("");
  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      maxSize: 1048576, // 1MB
      accept: {
        "image/jpeg": [],
        "image/jpg": [],
        "image/png": [],
      },
      onDrop: (acceptedFiles) => {
        setBase64String("");
        setHashResult(null);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  useEffect(() => {
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64String(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [files]);

  useEffect(() => {
    if (base64String && files[0]) {
      const newHashResult = {
        hash1: `0x${keccak256(
          base64String.substring(0, base64String.length / 6)
        )}`,
        hash2: `0x${keccak256(
          base64String.substring(
            base64String.length / 6,
            base64String.length / 3
          )
        )}`,
        hash3: `0x${keccak256(
          base64String.substring(
            base64String.length / 3,
            base64String.length / 2
          )
        )}`,
        hash4: `0x${keccak256(
          base64String.substring(
            base64String.length / 2,
            base64String.length / 1.5
          )
        )}`,
        hash5: `0x${keccak256(
          base64String.substring(
            base64String.length / 1.5,
            base64String.length / 1.2
          )
        )}`,
        hash6: `0x${keccak256(
          base64String.substring(base64String.length / 1.2, base64String.length)
        )}`,
        sliced1: base64String.substring(0, base64String.length / 6),
        sliced2: base64String.substring(
          base64String.length / 6,
          base64String.length / 3
        ),
        sliced3: base64String.substring(
          base64String.length / 3,
          base64String.length / 2
        ),
        sliced4: base64String.substring(
          base64String.length / 2,
          base64String.length / 1.5
        ),
        sliced5: base64String.substring(
          base64String.length / 1.5,
          base64String.length / 1.2
        ),
        sliced6: base64String.substring(
          base64String.length / 1.2,
          base64String.length
        ),
      };

      setHashResult(newHashResult);

      if (files[0]) {
        setTimeout(() => {
          onUploaded({
            hashResult: newHashResult,
            file: files[0],
          });
        }, 1000);
      }
    }
  }, [base64String, files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <div key={file.name} className="relative w-full">
      <img
        src={file.preview} // Revoke data uri after image is loaded
        className="w-full"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
    </div>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }, i) => (
    <li key={i}>
      {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {}}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel
                className={classNames(
                  "relative w-full max-w-md rounded-3xl p-6 backdrop-blur-xl overflow-hidden",
                  isDragActive ? "bg-white/75" : "bg-white/5"
                )}
              >
                <div className="absolute top-8 right-8 cursor-pointer z-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => onClose(false)}
                  >
                    <CloseIcon />
                  </div>
                </div>

                {thumbs.length != 0 && (
                  <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-75 z-10 flex flex-col items-center justify-center gap-8">
                    {base64String && typeof base64String == "string" && (
                      <div className="text-white">
                        Total character: {base64String.length}
                      </div>
                    )}
                    <div className="loader"></div>
                    <div className="text-white">Processing image...</div>
                  </div>
                )}

                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />

                  <div className="relative flex flex-col items-center justify-center py-16 gap-4">
                    {thumbs.length ? thumbs : <UploadIcon />}
                    <span className="text-white text-opacity-30">
                      Upload <strong>({legal.toUpperCase()})</strong> Doc
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4">
                    <span className="text-white text-opacity-50">
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                      <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </span>
                  </div>

                  <div className="text-red-500">{fileRejectionItems}</div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalUpload;
