import { HTMLAttributes, useState } from "react";
import clsx from "clsx";
import PDFResult from "./PdfResult";

const Result = ({ id, ...props }: { id: string } & HTMLAttributes<HTMLDivElement>) => {
  const [box, setBox] = useState<any>();

  return (
    <div
      {...props}
      className={clsx(
        props.className,
        "grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-6 relative lg:overflow-hidden"
      )}
    >
      <div className="col-span-2 bg-dark-2 rounded-lg p-4 overflow-hidden">
        <PDFResult
          id={id}
          setBox={setBox}
          className="h-[75vh] flex-1 bg-dark-3 rounded overflow-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v [&::-webkit-scrollbar-thumb]:cursor-pointer"
        />
      </div>
      <div className="bg-dark-2 rounded-lg flex flex-col divide-y divide-dark-1 overflow-hidden">
        <div className="p-4 text-center">Box information</div>
        <div className="flex-1 p-6 overflow-y-scroll [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gradient-primary-v [&::-webkit-scrollbar-thumb]:cursor-pointer">
          {box ? (
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-1">OCR text</p>
                <div className="bg-dark-3 px-4 py-2 rounded">{box.ocr}</div>
              </div>
              <div>
                <p className="mb-1">Matched Chinese</p>
                <div className="bg-dark-3 px-4 py-2 rounded">
                  {box.chi_aligned || "No text matched"}
                </div>
              </div>
              <div>
                <p className="mb-1">Matched Vietnamese</p>
                <div className="bg-dark-3 px-4 py-2 rounded">
                  {box.vi_aligned || "No text matched"}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex justify-center items-center">
              <p className="text-sm text-center">Click on a box to view box information</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <a
            href={`${import.meta.env.VITE_SERVER_URL}/api/result/${id}/xlsx`}
            download
            className="w-full h-10 rounded relative overflow-hidden bg-gradient-primary text-dark-1 flex justify-center items-center"
          >
            Export data
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
