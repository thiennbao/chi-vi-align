import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { HTMLAttributes } from "react";

const ToolLoading = ({ stage, ...props }: { stage: number } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(props.className, "flex flex-col justify-center items-center gap-6")}
    >
      <p className="font-bold flex gap-6">
        <span>Processing document OCR</span>
        <Icon
          icon={stage < 1 ? "eos-icons:bubble-loading" : "material-symbols:done-all-rounded"}
          width="24"
          height="24"
        />
      </p>
      <p className="font-bold flex gap-6">
        <span>Spliting Chinese text</span>
        <Icon
          icon={stage < 2 ? "eos-icons:bubble-loading" : "material-symbols:done-all-rounded"}
          width="24"
          height="24"
        />
      </p>
      <p className="font-bold flex gap-6">
        <span>Spliting Vietnamese text</span>
        <Icon
          icon={stage < 3 ? "eos-icons:bubble-loading" : "material-symbols:done-all-rounded"}
          width="24"
          height="24"
        />
      </p>
      <p className="font-bold flex gap-6">
        <span>Aligning Chinese text</span>
        <Icon
          icon={stage < 4 ? "eos-icons:bubble-loading" : "material-symbols:done-all-rounded"}
          width="24"
          height="24"
        />
      </p>
      <p className="font-bold flex gap-6">
        <span>Aligning Vietnamese text</span>
        <Icon
          icon={stage < 5 ? "eos-icons:bubble-loading" : "material-symbols:done-all-rounded"}
          width="24"
          height="24"
        />
      </p>
      <button>Download result</button>
    </div>
  );
};

export default ToolLoading;
