import { Icon } from "@iconify/react/dist/iconify.js";
import PDFViewer from "../components/PdfViewer";
import { HTMLAttributes, useState } from "react";
import FileInput from "./FileInput";
import clsx from "clsx";

const OcrTool = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  return (
    <div {...props}>
      <div className="col-span-2 bg-dark-2 rounded-lg overflow-hidden">
        {pdfFile ? (
          <div className="p-4 h-full flex flex-col justify-between gap-4">
            <PDFViewer
              file={pdfFile}
              className="flex-1 bg-dark-3 rounded overflow-scroll [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v"
            />
            <button
              onClick={() => setPdfFile(null)}
              className="block ml-auto px-4 py-1 border-2 text-primary border-primary hover:text-neutral-200 hover:bg-primary transition rounded"
            >
              Remove file
            </button>
          </div>
        ) : (
          <FileInput
            name="pdf"
            accept=".pdf"
            note="Supported file: PDF"
            onUpload={(file) => setPdfFile(file)}
            className="p-4 h-full"
          />
        )}
      </div>
      <div className="bg-dark-2 rounded-lg flex flex-col divide-y divide-dark-1">
        <div className="p-4 flex items-center gap-2 font-bold">
          <Icon icon="proicons:color-palette" width="24" height="24" />
          <div>Setting</div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="icon-park-outline:direction-adjustment-two" width="20" height="20" />
              <span>Text direction</span>
            </div>
            <label className="flex gap-2 items-center cursor-pointer rounded bg-dark-3 px-4 py-2">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-12 h-6 rounded-full bg-primary peer-checked:bg-secondary after:bg-white after:h-3/4 after:aspect-square after:rounded-full after:transition-all after:absolute after:top-1/2 after:-translate-y-1/2 after:start-[10%] peer-checked:after:start-[90%] peer-checked:after:-translate-x-full" />
              <span>Horizontal</span>
            </label>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="fluent:resize-image-20-filled" width="20" height="20" />
              <span>Resize image</span>
            </div>
            <input
              type="number"
              placeholder="No resizing"
              className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
            />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="fluent:document-page-bottom-right-24-regular" width="20" height="20" />
              <span>Page range</span>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="From page"
                className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
              />
              <input
                type="number"
                placeholder="To page"
                className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
              />
            </div>
          </div>
        </div>
        <div className="p-4">
          <button
            className={clsx(
              "w-full h-10 rounded",
              pdfFile ? "bg-gradient-primary text-dark-1" : "bg-dark-3"
            )}
            disabled={!pdfFile}
          >
            Ocr File
          </button>
        </div>
      </div>
    </div>
  );
};

export default OcrTool;
