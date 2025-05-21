"use client";

import PlusAdd from "@/assets/icons/add-image";
import CopyIcon from "@/assets/icons/copy-icon";
import Loader from "@/components/loader";
import { useIPFSContext } from "@/libs/ipfs/ipfs.context";
import { config } from "@/libs/web3/web3.provider";
import { decryptFile } from "@/utilities/encryptor";
import ConnectOptional from "@/widgets/connect_optional";
import ModalDetailIPFS from "@/widgets/modal_detail_ipfs";
import { signMessage } from "@wagmi/core";
import classNames from "classnames";
import { ConnectKitButton } from "connectkit";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

interface IPFSScreenProps {}

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

const IPFSScreen: FC<IPFSScreenProps> = () => {
  const { setModalOpened } = useIPFSContext();
  const { getIPFSList } = useIPFSContext();
  const { address } = useAccount();
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    data: "",
  });

  useEffect(() => {
    if (address) {
      getIPFSList.mutate({
        address: address,
      });
    }
  }, [address]);

  useEffect(() => {
    if (getIPFSList?.data?.list?.length > 0) {
      console.log("getIPFSList", getIPFSList?.data?.list);
    }
  }, [getIPFSList?.data?.list]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Text copied to clipboard");
      },
      (err) => {
        toast.error("Failed to copy text: " + err);
      }
    );
  };

  const iddleView = () => {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="max-w-[760px] w-full">
          <Image
            src="/images/ipfs-crust.png"
            className="w-full"
            alt="ipfs secured"
            width={760}
            height={386.24}
          />
        </div>
        <ConnectOptional
          onClick={() => {
            setModalOpened(true);
          }}
        />
      </div>
    );
  };

  const handleGetFile = async (cid: string) => {
    try {
      const sign = await signMessage(config, {
        message: address!,
      });

      const response = await fetch(`https://gw.crustgw.work/ipfs/${cid}`);
      const blob = await response.blob();
      const base64 = await new Response(blob).text();
      const decrypted = decryptFile(base64, sign);
      setModalOpen({
        isOpen: true,
        data: decrypted,
      });
    } catch (error) {
      toast.error("File may still be in the pinning process in Crust network");
    }
  };

  const renderList = () => {
    const list = getIPFSList?.data?.list;
    return (
      <div className="w-full flex-1 relative mx-auto pb-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        CID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Ordered
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {list.map((data: any) => (
                      <tr key={data["cid"]}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                          <div
                            onClick={() => copyToClipboard(data["cid"])}
                            className="cursor-pointer"
                          >
                            <p className="relative flex flex-row items-center justify-start gap-2">
                              {data["cid"] && data["cid"].length > 20 ? (
                                <span>{data["cid"].slice(0, 20) + "..."}</span>
                              ) : (
                                <span>{data["cid"]}</span>
                              )}
                              <span>
                                <CopyIcon fill="#42C5F2" />
                              </span>
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {data["ordered"] ? "Yes" : "No"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                          {moment(data["createdAt"]).format("LLL")}
                        </td>
                        <td className="relative flex flex-row items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 gap-4">
                          <div
                            onClick={
                              data["ordered"]
                                ? () => handleGetFile(data["cid"])
                                : () => {}
                            }
                            className={classNames(
                              " hover:text-indigo-300 cursor-pointer",
                              {
                                "text-indigo-400": data["ordered"],
                                "text-gray-700": !data["ordered"],
                              }
                            )}
                          >
                            View
                          </div>
                          <a
                            href={`https://ipfs-scan.io/?cid=${data["cid"]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300"
                          >
                            Scan
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-start justify-start">
        <div className="flex w-full flex-row justify-start items-center gap-4 px-4 py-4 relative z-10">
          <div className="flex-1 relative w-full">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">IPFS Files</span>
              <span className="text-gray-300">
                Total file: {getIPFSList?.data?.list?.length ?? "0"}
              </span>
            </div>
          </div>
          <ConnectKitButton.Custom>
            {({ isConnected, show, address, isConnecting }) => {
              return (
                <div
                  className="w-[36px] svg-wrapper cursor-pointer"
                  onClick={
                    !address && show
                      ? () => show()
                      : () => {
                          setModalOpened(true);
                        }
                  }
                >
                  <PlusAdd />
                </div>
              );
            }}
          </ConnectKitButton.Custom>
        </div>

        <div className="flex-1 w-full relative overflow-y-scroll">
          {getIPFSList.isIdle && iddleView()}

          {getIPFSList?.data &&
            getIPFSList?.data?.list &&
            getIPFSList?.data?.list?.length <= 0 &&
            iddleView()}

          {getIPFSList.isPending && (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-4">
              <Loader />
            </div>
          )}

          {getIPFSList?.data &&
            getIPFSList?.data?.list &&
            getIPFSList?.data?.list?.length > 0 &&
            renderList()}
          {getIPFSList.isError && (
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-4">
              <span className="text-white/25">Error loading your files</span>
            </div>
          )}
        </div>
      </div>

      <ModalDetailIPFS
        isOpen={modalOpen.isOpen}
        onClose={(value: boolean) => {
          setModalOpen({
            isOpen: value,
            data: "",
          });
        }}
        data={modalOpen.data}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(IPFSScreen), {
  ssr: false,
});
