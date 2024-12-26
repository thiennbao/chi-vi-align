import { Icon } from "@iconify/react/dist/iconify.js";
import { HTMLAttributes } from "react";

interface Props {
  name: string;
  accept: string;
  note: string;
  onUpload: (e: File | null) => void;
}

const FileInput = ({ name, accept, note, onUpload, ...props}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <input
        type="file"
        hidden
        id={name}
        name={name}
        accept={accept}
        onChange={(e) => onUpload(e.target.files?.[0] || null)}
      />
      <label
        htmlFor={name}
        className="w-full h-full flex flex-col gap-4 justify-center items-center rounded bg-dark-3 border border-dashed border-neutral-500 cursor-pointer text-neutral-200"
      >
        <Icon icon="icon-park-outline:upload-two" className="text-6xl opacity-50" />
        <div className="text-xs opacity-50">{note}</div>
      </label>
    </div>
  );
};

export default FileInput;
