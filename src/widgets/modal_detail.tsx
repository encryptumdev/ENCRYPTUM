import CloseIcon from "@/assets/icons/close-icon";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import copy from "copy-to-clipboard";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ModalDetailProps {
  isOpen: boolean;
  onClose(value: boolean): void;
  data: any[];
}

const ModalDetail: FC<ModalDetailProps> = ({ isOpen, onClose, data }) => {
  let dataType = "";

  const [fullImage, setFullImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      getFullImage(data);
    }
  }, [isOpen]);

  const getFullImage = (data: any) => {
    let base64String = "";

    if (data && data instanceof Array) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element["sliced"]) {
          base64String += element["sliced"];
        }
      }
    }

    if (base64String && base64String.length > 0) {
      setFullImage(base64String);
    } else {
      setFullImage(null);
    }
  };

  const handleCopy = async () => {
    copy("Text", {
      debug: true,
      message: "Press #{key} to copy",
      onCopy: () => {
        toast.success("Copied to clipboard", {
          duration: 2000,
          position: "bottom-center",
          icon: "✅",
        });
      },
    });
  };

  const handeGetDataImage = (data: string) => {
    if (data && data.includes("data:image/jpeg;base64")) {
      dataType = "data:image/jpeg;base64";
    } else if (data && data.includes("data:image/jpg;base64")) {
      dataType = "data:image/jpg;base64";
    } else if (data && data.includes("data:image/png;base64")) {
      dataType = "data:image/png;base64";
    }
  };

  const handleRenderImage = (data: string) => {
    console.log("data: ", data);
    if (data && data.includes("data:image/jpeg;base64")) {
      return (
        <img
          className="w-full h-[100px] object-top object-cover z-50"
          src={data}
          alt=""
        />
      );
    }

    if (data && data.includes("data:image/jpg;base64")) {
      return (
        <img
          className="w-full h-[100px] object-top object-cover z-50"
          src={data}
          alt=""
        />
      );
    }

    if (data && data.includes("data:image/png;base64")) {
      return (
        <img
          className="w-full h-[100px] object-top object-cover z-50"
          src={data}
          alt=""
        />
      );
    }

    return <div className="text-gray-300"></div>;
  };

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
                  "relative w-full max-w-md rounded-3xl p-6 backdrop-blur-xl overflow-hidden bg-white/5"
                )}
              >
                <div className="absolute top-6 right-6 cursor-pointer z-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => onClose(false)}
                  >
                    <CloseIcon />
                  </div>
                </div>

                <div className="font-semibold text-xl">Image Detail</div>

                <div className="flex flex-col gap-4 mt-8">
                  {fullImage && (
                    <img
                      className="w-full h-auto object-center object-cover z-50"
                      src={fullImage}
                      alt=""
                    />
                  )}

                  {data &&
                    data instanceof Array &&
                    data.map((item: any, index: number) => {
                      // handeGetDataImage(item["sliced"]);

                      return (
                        <div key={index} className="flex flex-col gap-1 ">
                          <div className={"text-white font-semibold"}>
                            {`Encrypted slice ${index + 1}`}
                          </div>

                          {item["hash"] && (
                            <div
                              className="text-gray-400 break-words"
                              onClick={handleCopy}
                            >
                              {item["hash"]}
                              {/* <span className="text-xs text-[#62F8FE] ml-2 cursor-pointer">
                                show in explorer
                              </span> */}
                            </div>
                          )}

                          {/* {item["sliced"] &&
                          (item["sliced"].includes("data:image/jpeg;base64") ||
                            item["sliced"].includes(
                              "data:image/png;base64"
                            )) ? (
                            <>
                              <img
                                className="w-full h-[100px] object-top object-cover z-50"
                                src={item["sliced"]}
                                alt=""
                              />
                              {console.log("item: ", item["sliced"])}
                            </>
                          ) : (
                            <div className="text-gray-300">Encrypted</div>
                          )} */}

                          {handleRenderImage(item["sliced"])}
                        </div>
                      );
                    })}
                </div>

                {/* {thumbs.length != 0 && (
                  <div className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-75 z-10 flex flex-col items-center justify-center gap-8">
                    {base64String && typeof base64String == "string" && (
                      <div className="text-white">
                        Total character: {base64String.length}
                      </div>
                    )}
                    <div className="loader"></div>
                    <div className="text-white">Processing image...</div>
                  </div>
                )} */}

                {/* <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />

                  <div className="flex flex-row items-center justify-end">
                    <div
                      className="cursor-pointer"
                      onClick={() => onClose(false)}
                    >
                      <CloseIcon />
                    </div>
                  </div>
                  <div className="relative flex flex-col items-center justify-center py-16">
                    {thumbs.length ? thumbs : <UploadIcon />}
                  </div>
                  <div className="flex flex-col items-center justify-center py-4">
                    <span className="text-white text-opacity-50">
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                      <em>(Only *.jpeg and *.png images will be accepted)</em>
                    </span>
                  </div>
                  <div className="text-red-500">{fileRejectionItems}</div>
                </div> */}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalDetail;
