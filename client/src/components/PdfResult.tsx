import axios from "axios";
import clsx from "clsx";
import { HTMLAttributes, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFResult = ({
  id,
  setBox,
  ...props
}: { id: string; setBox: (box: any) => void } & HTMLAttributes<HTMLDivElement>) => {
  const navigate = useNavigate();

  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const [result, setResult] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/result/${id}/json`)
      .then((res) => {
        const grouped = res.data.reduce((arr: any, box: any) => {
          if (!arr[box.pageId]) arr[box.pageId] = [];
          arr[box.pageId].push(box);
          return arr;
        }, {});
        setResult(grouped);
      })
      .catch((error) => {
        if (error.status === 404) navigate("/404");
        setResult([]);
        console.log(error);
      });
  }, [id]);

  return (
    <div {...props}>
      <Document
        file={`${import.meta.env.VITE_SERVER_URL}/api/result/${id}/pdf`}
        className={clsx("h-full flex flex-col items-center", !numPages && "justify-center")}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <div key={`page_${index + 1}`} className="relative">
              {result &&
                result[index] &&
                result[index].map((box: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      left: box.relative_pos.left,
                      top: box.relative_pos.top,
                      width: box.relative_width,
                      height: box.relative_height,
                    }}
                    onClick={() => setBox(box)}
                    className="absolute border border-primary z-10 cursor-pointer hover:bg-primary hover:bg-opacity-50"
                  />
                ))}
              <Page
                pageNumber={index + 1}
                className="[&_.react-pdf\\_\\_Page\\_\\_textContent]:hidden [&_.react-pdf\\_\\_Page\\_\\_annotations]:hidden"
              />
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PDFResult;
