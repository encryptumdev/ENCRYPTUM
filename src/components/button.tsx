import Loader2 from "@/components/loader-2";
import classNames from "classnames";
import { FC } from "react";

interface ButtonProps {
  text: string;
  padding?: string;
  onClick?: () => void;
  className?: string;
  classAdd?: string;
  loading?: boolean;
  type?: string;
}

const Button: FC<ButtonProps> = ({
  text,
  padding,
  onClick,
  className,
  classAdd,
  loading,
  type,
}) => {
  return (
    <button
      type="button"
      className={
        className
          ? className
          : classNames(
              "rounded-full text-sm font-semibold shadow-sm hover:bg-c-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500",
              padding ? padding : "px-4 py-2",
              type === "secondary"
                ? "bg-[#92AFFF] text-black"
                : "bg-c-primary text-white",
              classAdd ? classAdd : ""
            )
      }
      onClick={loading ? () => {} : onClick}
    >
      {loading ? <Loader2 /> : text}
    </button>
  );
};

export default Button;
