import Button from "@/components/button";
import { ConnectKitButton } from "connectkit";
import { FC } from "react";

interface ConnectButtonProps {
  className?: string;
  longText?: string;
}

const ConnectButton: FC<ConnectButtonProps> = ({ className, longText }) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, isConnecting }) => {
        return (
          <Button
            onClick={show ? () => show() : undefined}
            className={className}
            classAdd={"py-2.5 px-6"}
            text={
              !address
                ? longText
                  ? "Connect Wallet"
                  : "Connect"
                : `${address?.slice(0, 5)} ... ${address?.slice(-5)}`
            }
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
