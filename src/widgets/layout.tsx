"use client";

import AllDoc from "@/assets/icons/all-doc";
import IPFSIcon from "@/assets/icons/ipfs-icon";
import StakeIcon from "@/assets/icons/stake-icon";
import WalletIcon from "@/assets/icons/wallet-icon";
import Web3Provider from "@/libs/web3/web3.provider";
import { routeMatcher } from "@/utilities/routes";
import ConnectButton from "@/widgets/connect_button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import classNames from "classnames";
import { ConnectKitButton } from "connectkit";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const navigations = [
  {
    name: "All Doc",
    href: "/",
    icon: <AllDoc />,
  },
  {
    name: "IPFS",
    href: "/ipfs",
    icon: <IPFSIcon />,
  },
  {
    name: "Stake",
    href: "/stake",
    icon: <StakeIcon />,
  },
];

const Layout: FC<LayoutProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  return (
    <Web3Provider>
      <QueryClientProvider client={queryClient}>
        <main className="hello my-name">
          <div className="w-full h-full fixed"></div>
          <div className="w-full h-full fixed p-3 lg:p-12">
            <div className="w-full h-full bg-[#ffffff08] backdrop-blur-3xl bg-opacity-10 rounded-3xl overflow-hidden">
              <div className="flex flex-row absolute w-full h-full inset-0">
                <div
                  className={classNames(
                    "sidebar lg:w-[300px] w-[80px] bg-[#00000010] h-full bg-opacity-10"
                  )}
                >
                  <div className="relative w-full h-full flex flex-col">
                    <div className="p-4 lg:p-6 flex flex-row items-center justify-center lg:justify-start">
                      <Image
                        src="/images/encryptum_logo.png"
                        alt=""
                        className="w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]"
                        width={48}
                        height={48}
                      />
                    </div>

                    <div className="flex-1 flex flex-col p-4 lg:p-6 items-center justify-center lg:items-start">
                      <div className="flex-1">
                        <ul className="flex flex-col gap-8">
                          {
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            navigations.map(({ name, href, icon }) => {
                              const isMatch =
                                routeMatcher(pathname ?? "", href) &&
                                name.toLowerCase() !== "all doc";
                              const isHome =
                                pathname === "/" &&
                                name.toLowerCase() === "all doc";

                              return (
                                <li key={name}>
                                  <Link href={href}>
                                    <div
                                      className={classNames(
                                        "flex flex-row items-center justify-start gap-3 cursor-pointer",
                                        isMatch || isHome
                                          ? "text-[#62F8FE]"
                                          : "text-[#A8AAAB]"
                                      )}
                                    >
                                      <span
                                        className={classNames(
                                          isMatch || isHome ? "svg-blue" : ""
                                        )}
                                      >
                                        {icon}
                                      </span>
                                      <span className="font-medium hidden lg:block">
                                        {name}
                                      </span>
                                    </div>
                                  </Link>
                                </li>
                              );
                            })
                          }
                        </ul>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-2">
                        <div className="text-white text-opacity-50 hidden lg:block">
                          Account
                        </div>
                        <div className="w-full h-[36px]">
                          <div className="flex flex-row gap-2">
                            <ConnectKitButton.Custom>
                              {({
                                isConnected,
                                show,
                                address,
                                isConnecting,
                              }) => {
                                return (
                                  <div
                                    className="w-[40px] h-[40px] rounded-full overflow-hidden flex flex-col items-center justify-center bg-black cursor-pointer"
                                    onClick={show ? () => show() : undefined}
                                  >
                                    <WalletIcon />
                                  </div>
                                );
                              }}
                            </ConnectKitButton.Custom>

                            <div className="flex-1 hidden lg:block">
                              <ConnectButton />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content flex-1 flex flex-col relative">
                  <div className="bg-page fixed w-full h-full z-0"></div>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Toaster />
      </QueryClientProvider>
    </Web3Provider>
  );
};

export default dynamic(() => Promise.resolve(Layout), {
  ssr: false,
});
