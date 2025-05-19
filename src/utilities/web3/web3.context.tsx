"use client";

import { MissingAppProviderError } from "@/utilities/errors";
import { BigNumberish } from "ethers";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export interface IWeb3ContextContext {
  balance: BigNumberish;
  setBalance: (balance: BigNumberish) => void;
  loadingBalance: boolean;
  setLoadingBalance: (value: boolean) => void;
  checkBalance: () => void;
}

export const Web3Context = createContext<IWeb3ContextContext | undefined>(
  undefined
);

export function useWeb3() {
  const global = useContext(Web3Context);

  if (!global) throw new MissingAppProviderError("No Web3 was provided.");
  return global;
}

export interface Web3ProviderProps {
  children?: React.ReactNode;
}

const Web3ContextProvider = ({ children }: Web3ProviderProps) => {
  const { address } = useAccount();

  const [balance, setBalance] = useState<BigNumberish>(BigInt(0));
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      checkBalance();
    }
  }, [address]);

  const checkBalance = async () => {
    setLoadingBalance(true);

    // Check balance
    // const result = await getBalance(config, {
    //   // address,
    //   // token: HTAOCA,
    // });

    // setBalance(result.value);
    setLoadingBalance(false);
  };

  return (
    <Web3Context.Provider
      value={{
        balance,
        setBalance,
        loadingBalance,
        setLoadingBalance,
        checkBalance,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3ContextProvider;
