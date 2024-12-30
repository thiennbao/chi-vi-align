import clsx from "clsx";

const ToolTabButtons = ({ tab, setTab }: { tab: number; setTab: (tab: number) => void }) => {
  return (
    <>
      <button
        className={clsx("p-4 text-sm rounded-t-md border border-dark-2", tab === 0 && "bg-dark-2")}
        onClick={() => setTab(0)}
      >
        Ocr pdf
      </button>
      <button
        className={clsx("p-4 text-sm rounded-t-md border border-dark-2", tab === 1 && "bg-dark-2")}
        onClick={() => setTab(1)}
      >
        Chi text
      </button>
      <button
        className={clsx("p-4 text-sm rounded-t-md border border-dark-2", tab === 2 && "bg-dark-2")}
        onClick={() => setTab(2)}
      >
        Vi text
      </button>
    </>
  );
};

export default ToolTabButtons;
