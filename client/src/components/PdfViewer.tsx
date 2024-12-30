import clsx from "clsx";
import { HTMLAttributes, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewer = ({
  file,
  ...props
}: { file: File | string | null } & HTMLAttributes<HTMLDivElement>) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div {...props}>
      <Document
        file={file}
        className={clsx("h-full flex flex-col items-center", !numPages && "justify-center")}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="[&_.react-pdf\\_\\_Page\\_\\_textContent]:hidden [&_.react-pdf\\_\\_Page\\_\\_annotations]:hidden"
            />
          ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
