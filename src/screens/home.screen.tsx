"use client";

import AttachmentIcon from "@/assets/icons/attachment-icon";
import BankIcon from "@/assets/icons/bank-icon";
import MedicalIcon from "@/assets/icons/medical-icon";
import Loader from "@/components/loader";
import { useFileContext } from "@/utilities/file_context/file.context";
import ConnectOptional from "@/widgets/connect_optional";
import Header from "@/widgets/header";
import ModalDetail from "@/widgets/modal_detail";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useState } from "react";

interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = () => {
  const { dataInit, queryFinal, recentArr, setOpenUpload } = useFileContext();
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: any[];
  }>({
    isOpen: false,
    data: [],
  });

  const handleClick = (index: number) => {
    setModal({
      isOpen: true,
      data: recentArr[index],
    });
  };

  // useEffect(() => {
  //   console.log(dataInit);
  // }, [dataInit]);

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
      return base64String;
    } else {
      return "corrupted";
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-y-scroll px-8">
        <div className="relative w-full">
          {(!dataInit || (dataInit && dataInit.data.length == 0)) &&
            !dataInit.loading && (
              <>
                <div className="flex flex-col items-center justify-center text-[#5C5F62] my-12 text-center">
                  <div className="text-2xl">NO UPLOADED DOC YET</div>
                  <div className="">Please connect & upload your doc here!</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3  w-full items-center justify-center gap-12 pt-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span>Legal</span>
                    <span className="w-[80px] h-[80px] svg-wrapper flex flex-col items-center justify-center">
                      <BankIcon />
                    </span>
                    <span>
                      <ConnectOptional
                        onClick={() => {
                          setOpenUpload({
                            open: true,
                            legal: "legal",
                          });
                        }}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span>Medical</span>
                    <span className="w-[80px] h-[80px] svg-wrapper flex flex-col items-center justify-center">
                      <MedicalIcon />
                    </span>
                    <span>
                      <ConnectOptional
                        onClick={() => {
                          setOpenUpload({
                            open: true,
                            legal: "medical",
                          });
                        }}
                      />
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span>Other</span>
                    <span className="w-[80px] h-[80px] svg-wrapper flex flex-col items-center justify-center">
                      <AttachmentIcon />
                    </span>
                    <span>
                      <ConnectOptional
                        onClick={() => {
                          setOpenUpload({
                            open: true,
                            legal: "other",
                          });
                        }}
                      />
                    </span>
                  </div>
                </div>
              </>
            )}

          {dataInit && dataInit.loading && (
            <div className="px-4 py-8 flex flex-col items-center justify-center">
              <span className="text-white/25">Load your image...</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 py-4">
            {dataInit &&
              dataInit.data &&
              dataInit.data.map((item, index) => {
                let fullImage: string | null = null;

                if (recentArr[index]) {
                  fullImage = getFullImage(recentArr[index]);
                }

                return (
                  <div
                    key={index}
                    className="relative w-full h-32 bg-[#222222] rounded-lg flex flex-col items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => handleClick(index)}
                  >
                    {queryFinal &&
                      queryFinal.index === index &&
                      queryFinal.loading === true && (
                        <>
                          <span className="absolute bg-black w-full h-full bg-opacity-50"></span>
                          <span className="absolute inset-0 flex flex-col items-center justify-center">
                            <Loader />
                          </span>
                        </>
                      )}

                    {fullImage && fullImage != "corrupted" && (
                      <Image
                        src={fullImage}
                        alt=""
                        className="w-full h-full object-cover absolute inset-0"
                        fill
                      />
                    )}

                    {fullImage === "corrupted" && (
                      <div className="text-xs">corrupted files</div>
                    )}

                    {!fullImage && (
                      <Image
                        src="/images/doc_image.png"
                        alt=""
                        className="w-[24px] h-[24px]"
                        width={24}
                        height={24}
                      />
                    )}

                    {/* {recentArr &&
                  recentArr.length &&
                  recentArr.length === index + 1 && (
                    <Image
                      src={recentArr[index]
                        .map((item: any) => item.sliced)
                        .join("")}
                      alt=""
                      className="w-full h-full object-cover absolute inset-0"
                      fill
                    />
                  )} */}

                    {/*  */}
                  </div>
                );
              })}
          </div>

          <ModalDetail
            isOpen={modal.isOpen}
            onClose={() =>
              setModal({
                isOpen: false,
                data: [],
              })
            }
            data={modal.data}
          />
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(HomeScreen), {
  ssr: false,
});
