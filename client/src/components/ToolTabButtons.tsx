import clsx from "clsx";

const ToolTabButtons = ({ tab, setTab }: { tab: number; setTab: (tab: number) => void }) => {
  return (
    <>
      <button
        className={clsx(
          "px-4 py-2 border-2 border-primary rounded-md text-center",
          tab === 0 ? "bg-primary text-dark-1" : "text-primary"
        )}
        onClick={() => setTab(0)}
      >
        Ocr
      </button>
      <button
        className={clsx(
          "px-4 py-2 border-2 border-secondary rounded-md text-center",
          tab === 1 ? "bg-secondary text-dark-1" : "text-secondary"
        )}
        onClick={() => setTab(1)}
      >
        Chi text
      </button>
      <button
        className={clsx(
          "px-4 py-2 border-2 border-tertiary rounded-md text-center",
          tab === 2 ? "bg-tertiary text-dark-1" : "text-tertiary"
        )}
        onClick={() => setTab(2)}
      >
        Vi text
      </button>
    </>
  );
};

export default ToolTabButtons;
