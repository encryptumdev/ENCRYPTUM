import PlusAdd from "@/assets/icons/add-image";
import { useFileContext } from "@/libs/file/file.context";
import { ConnectKitButton } from "connectkit";
import dynamic from "next/dynamic";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { setOpenUpload, recentArr } = useFileContext();

  return (
    <div className="flex flex-row justify-start items-center gap-4 px-4 py-4 relative z-10">
      <div className="flex-1 relative w-full">
        <div className="flex flex-col">
          <span className="text-lg font-semibold">All Documents</span>
          <span className="text-gray-300">{recentArr.length} Doc</span>
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
                      setOpenUpload({
                        open: true,
                        legal: "other",
                      });
                    }
              }
            >
              <PlusAdd />
            </div>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), {
  ssr: false,
});
