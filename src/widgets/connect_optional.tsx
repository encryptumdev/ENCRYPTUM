import Button from "@/components/button";
import { ConnectKitButton } from "connectkit";
import { FC } from "react";

interface ConnectOptionalProps {
  className?: string;
  longText?: string;
  onClick?: () => void;
}

const ConnectOptional: FC<ConnectOptionalProps> = ({ className, onClick }) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, isConnecting }) => {
        return (
          <Button
            onClick={address ? onClick : show ? () => show() : undefined}
            className={className}
            text={"upload"}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectOptional;
