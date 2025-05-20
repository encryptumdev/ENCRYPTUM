"use client";

import Button from "@/components/button";
import dynamic from "next/dynamic";
import { FC } from "react";
import toast from "react-hot-toast";

interface IPFSScreenProps {}

const IPFSScreen: FC<IPFSScreenProps> = () => {
  const _handleUpload = () => {
    toast("IPFS upload still under contruction, stay tuned!", {
      icon: "🚧",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-8 p-4">
      <div className="max-w-[760px] w-full">
        <img
          src="/images/ipfs-crust.png"
          className="w-full"
          alt="ipfs secured"
        />
      </div>
      <Button onClick={_handleUpload} text={"upload"} />
    </div>
  );
};

export default dynamic(() => Promise.resolve(IPFSScreen), {
  ssr: false,
});
