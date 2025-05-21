import CloseIcon from "@/assets/icons/close-icon";
import UploadIcon from "@/assets/icons/upload-icon";
import { config } from "@/libs/web3/web3.provider";
import { encryptFile } from "@/utilities/encryptor";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { signMessage } from "@wagmi/core";
import classNames from "classnames";
import { FC, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

interface ModalIPFSProps {
  isOpen: boolean;
  onClose(value: boolean): void;
  onEncrypted(value: any): void;
}

const ModalIPFS: FC<ModalIPFSProps> = ({ isOpen, onClose, onEncrypted }) => {
  // ** HASHING RESULT
  const account = useAccount();

  // const [, setHashResult] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  // const [base64String, setBase64String] = useState<any>("");
  const { fileRejections, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      maxSize: 20000000, // 20MB
      accept: {
        "image/jpeg": [],
        "image/jpg": [],
        "image/png": [],
      },
      onDrop: (acceptedFiles) => {
        // setBase64String("");
        // setHashResult(null);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const handleEncrypt = async (base64: string) => {
    try {
      const sign = await signMessage(config, {
        message: account.address!,
      });

      const encrypted = encryptFile(base64, sign);
      onEncrypted({
        sign,
        encrypted,
      });
    } catch (error) {
      setFiles([]);
    }
  };

  useEffect(() => {
    if (files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result && typeof reader.result === "string") {
          handleEncrypt(reader.result);
        } else {
          toast.error("Error reading file");
          onClose(false);
        }
      };

      reader.readAsDataURL(file);
    }
  }, [files]);

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
                    {/* {base64String && typeof base64String == "string" && (
                      <div className="text-white">
                        Total character: {base64String.length}
                      </div>
                    )} */}
                    <div className="loader"></div>
                    <div className="text-white">Processing file</div>
                  </div>
                )}

                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />

                  <div className="relative flex flex-col items-center justify-center py-16 gap-4">
                    {thumbs.length ? thumbs : <UploadIcon />}
                    {/* <span className="text-white text-opacity-30">
                      Upload <strong>({legal.toUpperCase()})</strong> Doc
                    </span> */}
                  </div>

                  <div className="flex flex-col items-center justify-center py-4">
                    <span className="text-white text-opacity-50">
                      <p>
                        Drag and drop some files here, or click to select files
                      </p>
                      <p>
                        Max size: <strong>20MB</strong>
                      </p>
                      {/* <em>(Only *.jpeg and *.png images will be accepted)</em> */}
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

export default ModalIPFS;
