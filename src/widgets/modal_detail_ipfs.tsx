import CloseIcon from "@/assets/icons/close-icon";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";
import { FC } from "react";

interface ModalDetailIPFSProps {
  isOpen: boolean;
  onClose(value: boolean): void;
  data: string;
}

const ModalDetailIPFS: FC<ModalDetailIPFSProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {}}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel
                className={classNames(
                  "relative w-full max-w-md rounded-3xl p-6 backdrop-blur-xl overflow-hidden bg-white/5"
                )}
              >
                <div className="absolute top-6 right-6 cursor-pointer z-10">
                  <div
                    className="cursor-pointer"
                    onClick={() => onClose(false)}
                  >
                    <CloseIcon />
                  </div>
                </div>

                <div className="font-semibold text-xl">File Detail</div>

                <div className="flex flex-col gap-4 mt-8">
                  <img
                    className="w-full h-auto object-center object-cover z-50"
                    src={data}
                    alt=""
                  />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalDetailIPFS;
