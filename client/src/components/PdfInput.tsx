import { Icon } from "@iconify/react/dist/iconify.js";
import { HTMLAttributes } from "react";

const PdfInput = ({
  onUpload,
  ...props
}: { onUpload: (e?: File) => void } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <input
        type="file"
        hidden
        id="file"
        name="file"
        accept="application/pdf"
        onChange={(e) => onUpload(e.target.files?.[0])}
      />
      <label
        htmlFor="file"
        className="w-full h-full flex flex-col gap-4 justify-center items-center rounded bg-dark-3 border border-dashed border-neutral-500 cursor-pointer text-neutral-200"
      >
        <Icon icon="icon-park-outline:upload-two" className="text-6xl opacity-50" />
        <div className="text-xs opacity-50">Supported file: PDF</div>
      </label>
    </div>
  );
};

export default PdfInput;
