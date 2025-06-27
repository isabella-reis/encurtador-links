import { Copy, Trash2 } from "lucide-react";
import { deleteShortLink } from "../http/shortLinks";

interface CreatedLinksItemProps {
  link: {
    id: string;
    shortCode: string;
    originalUrl: string;
    hits: number;
  };
  onDeleted: () => void;
}

export function CreatedLinksItem({ link, onDeleted }: CreatedLinksItemProps) {
  async function handleDelete() {
    await deleteShortLink(link.id);
    onDeleted();
  }

  function handleCopy() {
    navigator.clipboard.writeText(`brev.ly/${link.shortCode}`);
  }

  return (
    <div className="w-full flex items-center justify-between px-2 py-3 bg-white rounded-md">
      <div className="flex flex-col max-w-[160px] lg:max-w-[240px]">
        <div className="flex flex-col max-w-[160px] lg:max-w-[240px]">
          <a
            href={`/${link.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-bluebase truncate hover:underline"
          >
            brev.ly/{link.shortCode}
          </a>
          <span className="text-xs text-gray-500 truncate">
            {link.originalUrl}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-xs mr-2 text-gray-500 font-sm">
          {link.hits} acessos
        </span>

        <button
          onClick={handleCopy}
          className="w-8 h-8 rounded-md bg-gray-200 text-gray-500 hover:outline-none hover:ring-1 hover:ring-bluebase flex items-center justify-center cursor-pointer"
        >
          <Copy className="w-4 h-4" />
        </button>

        <button
          onClick={handleDelete}
          className="w-8 h-8 rounded-md bg-gray-200 text-gray-500 hover:outline-none hover:ring-1 hover:ring-bluebase flex items-center justify-center cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
