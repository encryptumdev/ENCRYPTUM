"use client";

import ArrowLeft from "@/assets/icons/arrow-left";
import { useFileContext } from "@/utilities/file_context/file.context";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";

interface DetailScreenProps {}

const DetailScreen: FC<DetailScreenProps> = () => {
  const param = useParams();
  const { recentArr } = useFileContext();

  useEffect(
    () => {
      // console.log(recentArr);
      // console.log(recentArr[parseInt(param.id.toString())]);
    },
    [
      // recentArr
    ]
  );

  return (
    <div className="my-4">
      <div className="flex flex-row gap-4">
        <ArrowLeft />
        <div className="flex flex-col items-start justify-start">
          <span className="text-white font-semibold">DOC Detail</span>
          <span className="text-gray-500">0x3asd342ewjkahew.......</span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start">{}</div>
    </div>
  );
};

export default DetailScreen;
