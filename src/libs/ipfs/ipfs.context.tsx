"use client";

import { fetchQueryIPFS, postIPFS, updateIPFS } from "@/libs/file/file.fetcher";
import { IPFS_ABI } from "@/libs/ipfs/ipfs.abi";
import { config } from "@/libs/web3/web3.provider";
import { MissingAppProviderError } from "@/utilities/errors";
import ModalIPFS from "@/widgets/modal_ipfs";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { readContract, writeContract } from "@wagmi/core";
import { create } from "ipfs-http-client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

// Base
const CONTRACT_ADDRESS = "0xf063A29f03d0A02FD96f270EE4F59158EF3d4860";
const CHAIN_URL = "https://ethereum-mainnet-rpc.allthatnode.com";
const isPermanentStorage = true; // false means 6 months storage

export interface IIPFSContextContextContext {
  address: `0x${string}` | undefined;
  setModalOpened: Dispatch<SetStateAction<boolean>>;
  handleCloseModal: () => void;
  getIPFSList: UseMutationResult<any, any, any, any>;
}

export const IPFSContextContext = createContext<
  IIPFSContextContextContext | undefined
>(undefined);

export function useIPFSContext() {
  const global = useContext(IPFSContextContext);

  if (!global)
    throw new MissingAppProviderError("No IPFSContext was provided.");
  return global;
}

export interface IPFSContextProviderProps {
  children?: React.ReactNode;
}

const IPFSContextContextProvider = ({ children }: IPFSContextProviderProps) => {
  const { address } = useAccount();
  const [modalOpened, setModalOpened] = useState(false);

  const getIPFSList = useMutation<any, any, any, any>({
    mutationFn: (body) => fetchQueryIPFS(body),
    onSuccess: (data) => {
      console.log("mutationCreate success", data);
    },
    onError: (e) => {
      console.log("mutationCreate error", e);
      console.log(e);
    },
  });

  const handleUploadedFile = async (value: any) => {
    const { sign, encrypted } = value;

    try {
      // 1. Get all inputss
      const ipfsGateway = "https://ipfs-gw.decloud.foundation"; // IPFS Web3 Authed Gateway address
      const ipfsPinningService = "https://pin.crustcode.com/psa"; // IPFS Web3 Authed Pinning Service address

      // 2. Construct auth header
      const authHeader = Buffer.from(`eth-${address}:${sign}`).toString(
        "base64"
      );

      // 3. Create ipfs http client
      const ipfs = create({
        url: ipfsGateway + "/api/v0",
        headers: {
          authorization: "Basic " + authHeader,
        },
      });

      const ipsf = await ipfs.add(encrypted);

      if (ipsf.cid) {
        console.log(ipsf.cid.toV0().toString());
      } else {
        setModalOpened(false);
        toast.error("IPFS add failed, please try again.");
      }

      // QmWfWt8ogFYhvqkPaLsgMxrkP5vzjspfgDHEansbX5K39j

      const file = await postIPFS({
        cid: ipsf.cid.toV0().toString(),
        address: address,
        ordered: false,
      });

      const fileStat = await ipfs.files.stat("/ipfs/" + ipsf.path);

      const price: any = await readContract(config, {
        abi: IPFS_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "getPrice",
        args: [fileStat.size, isPermanentStorage],
      });

      const placeOrder = await writeContract(config, {
        abi: IPFS_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "placeOrder",
        args: [ipsf.cid.toV0().toString(), fileStat.size, isPermanentStorage],
        value: price,
      });

      if (placeOrder) {
        const updated = await updateIPFS({
          cid: ipsf.cid.toV0().toString(),
          ordered: true,
        });

        toast.success("IPFS file uploaded successfully.");
        setModalOpened(false);

        getIPFSList.mutate({
          address: address,
        });
      }
    } catch (error) {
      toast.error("Some thing went wrong!");
    }
  };

  const handleCloseModal = () => {
    setModalOpened(false);
  };

  return (
    <IPFSContextContext.Provider
      value={{
        address,
        setModalOpened,
        handleCloseModal,
        getIPFSList,
      }}
    >
      {children}
      <ModalIPFS
        isOpen={modalOpened}
        onClose={handleCloseModal}
        onEncrypted={handleUploadedFile}
      />
    </IPFSContextContext.Provider>
  );
};

export default IPFSContextContextProvider;
