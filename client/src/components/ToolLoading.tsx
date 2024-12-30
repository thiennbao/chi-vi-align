import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { HTMLAttributes } from "react";

const ToolLoading = ({ step, ...props }: { step: number } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(props.className, "flex flex-col justify-center items-center gap-6")}
    >
      {step === 1 && (
        <p className="font-bold flex gap-6">
          <span>Processing document OCR</span>
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        </p>
      )}
      {step === 2 && (
        <p className="font-bold flex gap-6">
          <span>Processing texts</span>
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        </p>
      )}
      {step === 3 && (
        <p className="font-bold flex gap-6">
          <span>Aligning Chinese text</span>
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        </p>
      )}
      {step === 4 && (
        <p className="font-bold flex gap-6">
          <span>Aligning Vietnamese text</span>
          <Icon icon="eos-icons:bubble-loading" width="24" height="24" />
        </p>
      )}
    </div>
  );
};

export default ToolLoading;
