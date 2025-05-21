"use client";

import { ABI } from "@/libs/file/abi";
import { fetchQueryFiles, postFiles } from "@/libs/file/file.fetcher";
import { config } from "@/libs/web3/web3.provider";
import { MissingAppProviderError } from "@/utilities/errors";
import ModalUpload from "@/widgets/modal_upload";
import { useMutation } from "@tanstack/react-query";
import { readContract, writeContract } from "@wagmi/core";
import { BigNumberish, ethers } from "ethers";
import dynamic from "next/dynamic";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { mainnet } from "wagmi/chains";

export interface IFileContext {
  setOpenUpload: ({ open, legal }: { open: boolean; legal: string }) => void;
  handleGetDataList: () => void;
  openUpload: {
    open: boolean;
    legal: string;
  };
  dataInit: {
    data: any[];
    loading: boolean;
    error: any;
  };
  queryFinal: {
    index: number;
    loading: boolean;
  };
  recentArr: any[];
}

export const FileContext = createContext<IFileContext | undefined>(undefined);

export function useFileContext() {
  const global = useContext(FileContext);

  if (!global) throw new MissingAppProviderError("No Payment was provided.");
  return global;
}

export interface FileProviderProps {
  children?: React.ReactNode;
}

const FileProvider = ({ children }: FileProviderProps) => {
  const { address } = useAccount();
  const [openUpload, setOpenUpload] = useState({
    open: false,
    legal: "other",
  });

  const [writeFile, setWriteFile] = useState<any>({
    files: [],
    loading: false,
    error: null,
  });

  const [dataInit, setDataInit] = useState<any>({
    data: [],
    loading: false,
    error: null,
  });

  // [
  //   2n,
  //   3n,
  //   4n,
  //   5n,
  //   6n,
  //   9n,
  // ]

  const [queryFinal, setQueryFinal] = useState<any>({
    loading: false,
    index: 0,
  });

  // const ca = "0xdFD156FB8f0d596B0C418135c3CbbB31002Dd21E";
  const ca = "0x888a44bfe324cac37161a237975ee7e3e0667aae";
  const legal =
    "0x348071e2404dfc0c69d9774f430688e64055162279429c073337d916c76aa5dc";

  const [recentArr, setRecentArray] = useState<any[]>([]);

  useEffect(() => {
    if (address) {
      handleGetDataList();
    } else {
      setDataInit({
        data: [],
        loading: false,
        error: null,
      });

      setQueryFinal({
        loading: false,
        index: 0,
      });

      setWriteFile({
        files: [],
        loading: false,
        error: null,
      });
    }
  }, [address]);

  useEffect(() => {
    if (dataInit && dataInit.data.length > 0) {
      mappingGetDataInit(dataInit.data);
    }
  }, [dataInit]);

  const mappingGetDataInit = async (data: any[]) => {
    const arr = [];

    for (let i = 0; i < data.length; i++) {
      setQueryFinal({
        loading: true,
        index: i,
      });

      const element = data[i];
      const elementIndex = ethers.formatUnits(element, 0);
      const dataInit = await handleGetDataInit(element, Number(elementIndex));

      if (dataInit) {
        // arr.push(dataInit.data);
        setRecentArray((prev) => [...prev, dataInit.data]);

        setQueryFinal({
          loading: false,
          index: i,
        });
      } else {
        // arr.push([]);
        setRecentArray((prev) => [...prev, []]);
        setQueryFinal({
          loading: false,
          index: i,
        });
      }
    }

    // setRecentArray(arr);
  };

  const handleGetDataList = async () => {
    if (!address) return;

    try {
      setDataInit({
        data: [],
        loading: true,
        error: null,
      });

      const result = await readContract(config, {
        abi: ABI,
        address: ca,
        functionName: "getDataList",
        args: [address],
        // chainId: telosTestnet.id,
        chainId: mainnet.id,
      });

      if (result && result instanceof Array && result.length > 0) {
        setDataInit({
          data: result,
          loading: false,
          error: null,
        });
      } else {
        setDataInit({
          data: [],
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.log(error);
      setDataInit({
        data: [],
        loading: false,
        error: error,
      });
    }
  };

  const handleGetDataInit = async (arrNumber: BigNumberish, index: number) => {
    try {
      const result = await readContract(config, {
        abi: ABI,
        address: ca,
        functionName: "getDataInit",
        args: [address, arrNumber],
        // chainId: telosTestnet.id,
        chainId: mainnet.id,
      });

      if (result && result instanceof Array && result.length > 0) {
        return await handleGetDataFinal(arrNumber, result, index);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleGetDataFinal = async (
    arrNumber: BigNumberish,
    dataInit: any,
    index: number
  ) => {
    try {
      const result = await readContract(config, {
        abi: ABI,
        address: ca,
        functionName: "getDataFinal",
        args: [address, arrNumber],
        // chainId: telosTestnet.id,
        chainId: mainnet.id,
      });

      console.log("handleGetDataFinal", result);

      if (result && result instanceof Array && result.length > 0) {
        return await queryFiles(arrNumber, [...dataInit, ...result], index);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const handleUploadedFile = (value: any) => {
    handleWriteFile(value);
  };

  const handleWriteFile = async (value: any) => {
    try {
      setWriteFile({
        file: [...writeFile.files],
        loading: true,
        error: null,
      });

      const result = await writeContract(config, {
        abi: ABI,
        address: ca,
        functionName: "storeData",
        args: [
          value["hashResult"]["hash1"],
          value["hashResult"]["hash2"],
          value["hashResult"]["hash3"],
          value["hashResult"]["hash4"],
          value["hashResult"]["hash5"],
          value["hashResult"]["hash6"],
          legal,
        ],
        // chainId: telosTestnet.id,
        chainId: mainnet.id,
      });

      console.log("handleWriteFile", result);

      if (result) {
        console.log("value", value);

        mutationCreate.mutate([
          {
            hash: value["hashResult"]["hash1"],
            sliced: value["hashResult"]["sliced1"],
          },
          {
            hash: value["hashResult"]["hash2"],
            sliced: value["hashResult"]["sliced2"],
          },
          {
            hash: value["hashResult"]["hash3"],
            sliced: value["hashResult"]["sliced3"],
          },
          {
            hash: value["hashResult"]["hash4"],
            sliced: value["hashResult"]["sliced4"],
          },
          {
            hash: value["hashResult"]["hash5"],
            sliced: value["hashResult"]["sliced5"],
          },
          {
            hash: value["hashResult"]["hash6"],
            sliced: value["hashResult"]["sliced6"],
          },
          {
            hash: value["hashResult"]["hash1"],
            legal: legal,
          },
        ]);

        setWriteFile({
          file: [...writeFile.files, value],
          loading: false,
          error: null,
        });
      } else {
        setWriteFile({
          file: [...writeFile.files],
          loading: false,
          error: null,
        });

        setOpenUpload({
          open: false,
          legal: "other",
        });
        toast.error("Failed to write file");
      }
    } catch (error) {
      setWriteFile({
        file: [...writeFile.files],
        loading: false,
        error: error,
      });

      setOpenUpload({
        open: false,
        legal: "other",
      });
      toast.error("Failed to write file");
    }
  };

  const mutationCreate = useMutation<any, any, any, any>({
    mutationFn: (body) => postFiles(body),
    onSuccess: (data) => {
      console.log("mutationCreate", data);

      setOpenUpload({
        open: false,
        legal: "other",
      });

      if (window) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    onError: (e) => {
      console.log("mutationCreate error", e);
      console.log(e);
    },
  });

  const queryFiles: any = async (
    arrNumber: BigNumberish,
    dataFinal: any[],
    index: number
  ) => {
    try {
      const result = await fetchQueryFiles(dataFinal);

      if (
        result.file &&
        result.file instanceof Array &&
        result.file.length > 0
      ) {
        const finalResult: {
          hash: string;
          sliced: string;
        }[] = [];

        const resultArr: any[] = result.file;

        for (let i = 0; i < dataFinal.length; i++) {
          const element = dataFinal[i];

          for (let j = 0; j < resultArr.length; j++) {
            const k = resultArr[j];

            if (k["hash"] === element) {
              const isSame = finalResult.find((item) => item.hash === element);
              if (!isSame) {
                finalResult.push({
                  hash: element,
                  sliced: k["sliced"],
                });
              }
            }
          }
        }

        return {
          index: index,
          data: finalResult,
        };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <FileContext.Provider
        value={{
          openUpload,
          setOpenUpload,
          handleGetDataList,
          dataInit,
          queryFinal,
          recentArr,
        }}
      >
        {children}
        <ModalUpload
          isOpen={openUpload.open}
          legal={openUpload.legal}
          onClose={() => {
            setOpenUpload({
              open: false,
              legal: "other",
            });
          }}
          onUploaded={handleUploadedFile}
        />
      </FileContext.Provider>
    </>
  );
};

export default dynamic(() => Promise.resolve(FileProvider), { ssr: false });
