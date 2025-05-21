import Button from "@/components/button";
import { ConnectKitButton } from "connectkit";
import { FC } from "react";

interface ConnectOptionalProps {
  className?: string;
  longText?: string;
  onClick?: () => void;
  text?: string;
}

const ConnectOptional: FC<ConnectOptionalProps> = ({
  className,
  onClick,
  text,
}) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, isConnecting }) => {
        return (
          <Button
            onClick={address ? onClick : show ? () => show() : undefined}
            className={className}
            text={text ?? "Upload"}
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectOptional;
