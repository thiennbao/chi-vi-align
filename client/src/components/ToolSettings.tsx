import { Icon } from "@iconify/react/dist/iconify.js";
import { Config } from "./Tool";

interface Props {
  tab: number;
  config: Config;
  setConfig: (config: Config) => void;
}

const ToolSettings = ({ tab, config, setConfig }: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {tab === 0 && (
        <>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="icon-park-outline:direction-adjustment-two" width="20" height="20" />
              <span>Text direction</span>
            </div>
            <label className="flex gap-2 items-center cursor-pointer rounded bg-dark-3 px-4 py-2">
              <input
                checked={!!config.dir}
                type="checkbox"
                onChange={(e) => setConfig({ ...config, dir: e.target.checked })}
                className="sr-only peer"
              />
              <div className="relative w-12 h-6 rounded-full bg-primary peer-checked:bg-tertiary after:bg-white after:h-3/4 after:aspect-square after:rounded-full after:transition-all after:absolute after:top-1/2 after:-translate-y-1/2 after:start-[10%] peer-checked:after:start-[90%] peer-checked:after:-translate-x-full" />
              <span>{config.dir ? "Horizontal" : "Vertical"}</span>
            </label>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="fluent:resize-image-20-filled" width="20" height="20" />
              <span>Resize image</span>
            </div>
            <input
              type="number"
              value={config.size || ""}
              onChange={(e) => setConfig({ ...config, size: Number(e.target.value) || 0 })}
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
                value={config.from || ""}
                onChange={(e) => setConfig({ ...config, from: Number(e.target.value) || 0 })}
                placeholder="From"
                className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
              />
              <input
                type="number"
                value={config.to || ""}
                onChange={(e) => setConfig({ ...config, to: Number(e.target.value) || 0 })}
                placeholder="To"
                className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
              />
            </div>
          </div>
        </>
      )}
      {tab === 1 && (
        <>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="hugeicons:alphabet-chinese" width="20" height="20" />
              <span>Sentence splitters</span>
            </div>
            <input
              value={config.chiSplit || ""}
              onChange={(e) => setConfig({ ...config, chiSplit: e.target.value })}
              placeholder="。？！"
              className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
            />
          </div>
        </>
      )}
      {tab === 2 && (
        <>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Icon icon="mdi:alphabet-latin" width="20" height="20" />
              <span>Sentence splitters</span>
            </div>
            <input
              value={config.viSplit || ""}
              onChange={(e) => setConfig({ ...config, viSplit: e.target.value })}
              placeholder=". ? ! ;"
              className="w-full outline-none border-none rounded bg-dark-3 px-4 py-2"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ToolSettings;
