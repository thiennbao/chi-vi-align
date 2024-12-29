import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import ToolTabButtons from "./ToolTabButtons";
import PdfInput from "./PdfInput";
import ToolSettings from "./ToolSettings";
import PDFViewer from "./PdfViewer";
import axios from "axios";

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

  const handleSubmit = async () => {
    try {
      // Step 1: Ocr pdf
      const ocrData = new FormData();
      ocrData.append("file", file || "");
      ocrData.append("direction", config.dir ? "vertical" : "horizontal");
      ocrData.append("size", config.size ? String(Math.max(0, config.size)) : "");
      ocrData.append("from", config.from ? String(Math.max(1, config.from)) : "");
      ocrData.append("to", config.to ? String(Math.max(1, config.to)) : "");
      // const ocrRes = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/ocr`, ocrData);
      // const workdirId: string = ocrRes.data.i
      const workdirId = "test";

      // Step 2: Sentencize Chinese text
      const senData = new FormData();
      senData.append("id", workdirId);
      const chiBlob = new Blob([chi], { type: "text/plain" });
      const chiFile = new File([chiBlob], ".txt", { type: "text/plain" });
      const viBlob = new Blob([vi], { type: "text/plain" });
      const viFile = new File([viBlob], ".txt", { type: "text/plain" });
      senData.append("chiText", chiFile);
      senData.append("viText", viFile);
      senData.append("chiSplit", config.chiSplit || "．！？");
      senData.append("viSplit", config.viSplit || ".!?;");
      // await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/sen`, senData);

      // Step 3: Align Chinese text
      // await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/chi-align`, { id: workdirId });

      // Step 4: Align Vietnamese text
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/vi-align`, { id: workdirId });

      // Display result
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const progress = +Boolean(file) + +Boolean(chi) + +Boolean(vi);
  return (
    <div
      {...props}
      className={clsx(props.className, "grid grid-cols-3 gap-6 relative overflow-hidden")}
    >
      {/* {loading >= 0 && (
        <ToolLoading
          stage={loading}
          className="absolute z-50 rounded-md w-full h-full bg-dark-2 bg-opacity-95"
        />
      )} */}
      <div className="col-span-2 bg-dark-2 rounded-lg p-4 overflow-hidden">
        {file ? (
          <div
            className={clsx("h-full flex flex-col justify-between gap-4", tab !== 0 && "hidden")}
          >
            <PDFViewer
              file={file}
              className="flex-1 bg-dark-3 rounded overflow-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v [&::-webkit-scrollbar-thumb]:cursor-pointer"
            />
            <button
              onClick={() => setFile(undefined)}
              className="block ml-auto px-4 py-1 border-2 text-primary border-primary hover:text-neutral-200 hover:bg-primary transition rounded"
            >
              Remove file
            </button>
          </div>
        ) : (
          <PdfInput
            onUpload={(file) => setFile(file)}
            className={clsx("h-full", tab !== 0 && "hidden")}
          />
        )}
        <textarea
          placeholder="Paste some Chinese text here"
          className={clsx(
            "resize-none p-4 w-full h-full bg-dark-3 outline-none border border-dashed border-neutral-500 rounded [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v [&::-webkit-scrollbar-thumb]:cursor-pointer",
            tab !== 1 && "hidden"
          )}
          value={chi}
          onChange={(e) => setChi(e.target.value)}
        />
        <textarea
          placeholder="Paste some Vietnamese text here"
          className={clsx(
            "resize-none p-4 w-full h-full bg-dark-3 outline-none border border-dashed border-neutral-500 rounded [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v [&::-webkit-scrollbar-thumb]:cursor-pointer",
            tab !== 2 && "hidden"
          )}
          value={vi}
          onChange={(e) => setVi(e.target.value)}
        />
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
              progress !== 3 && "cursor-not-allowed"
            )}
            disabled={progress !== 3}
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
                progress === 1 && "w-1/3",
                progress === 2 && "w-2/3",
                progress === 3 && "w-full"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tool;
