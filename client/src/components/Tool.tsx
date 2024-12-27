import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import ToolTabButtons from "./ToolTabButtons";
import PdfInput from "./PdfInput";
import ToolSettings from "./ToolSettings";
import PDFViewer from "./PdfViewer";

export interface Config {
  dir?: boolean;
  size?: number;
  from?: number;
  to?: number;
  viSplit?: string;
  chiSplit?: string;
}

const Tool = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [tab, setTab] = useState(0);
  const [file, setFile] = useState<File>();
  const [chi, setChi] = useState("");
  const [vi, setVi] = useState("");
  const [config, setConfig] = useState<Config>({});

  const handleSubmit = () => {
    console.log(file);
    console.log(chi);
    console.log(vi);
    console.log(config);
  };

  const progress = +Boolean(file) + +Boolean(chi) + +Boolean(vi);

  return (
    <div {...props} className={clsx(props.className, "grid grid-cols-3 gap-6")}>
      <div className="col-span-2 bg-dark-2 rounded-lg p-4 overflow-hidden">
        {tab === 0 && (
          <>
            {file ? (
              <div className="p-4 h-full flex flex-col justify-between gap-4">
                <PDFViewer
                  file={file}
                  className="flex-1 bg-dark-3 rounded overflow-scroll [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v"
                />
                <button
                  onClick={() => setFile(undefined)}
                  className="block ml-auto px-4 py-1 border-2 text-primary border-primary hover:text-neutral-200 hover:bg-primary transition rounded"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <PdfInput onUpload={(file) => setFile(file)} className="h-full" />
            )}
          </>
        )}
        {tab === 1 && (
          <textarea
            placeholder="Paste some Chinese text here"
            className="resize-none p-4 w-full h-full bg-dark-3 outline-none border border-dashed border-neutral-500 rounded"
            value={chi}
            onChange={(e) => setChi(e.target.value)}
          />
        )}
        {tab === 2 && (
          <textarea
            placeholder="Paste some Vietnamese text here"
            className="resize-none p-4 w-full h-full bg-dark-3 outline-none border border-dashed border-neutral-500 rounded"
            value={vi}
            onChange={(e) => setVi(e.target.value)}
          />
        )}
      </div>
      <div className="bg-dark-2 rounded-lg flex flex-col divide-y divide-dark-1">
        <div className="p-4 grid grid-cols-3 gap-4">
          <ToolTabButtons tab={tab} setTab={setTab} />
        </div>
        <div className="flex-1 p-4 flex flex-col gap-6">
          <ToolSettings tab={tab} config={config} setConfig={setConfig} />
        </div>
        <div className="p-4">
          <button
            className={clsx(
              "w-full h-10 rounded relative overflow-hidden bg-dark-3",
              progress > 1 && "text-dark-1",
              !(file && chi && vi) && "cursor-not-allowed"
            )}
            disabled={!(file && chi && vi)}
            title={file && chi && vi ? "" : "Data is not enough"}
            onClick={handleSubmit}
          >
            <span className="relative z-10">
              {progress === 3 ? "Start aligning" : `Data uploaded ${progress}/3`}
            </span>
            <div
              className={clsx(
                "absolute top-0 h-full bg-gradient-primary transition-all",
                progress === 0 && "w-0",
                progress === 3 ? "w-full" : `w-${progress}/3`
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tool;
