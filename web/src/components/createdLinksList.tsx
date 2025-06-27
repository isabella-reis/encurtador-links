import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Download, Link } from 'lucide-react'
import { useEffect, useState } from 'react'
import { exportShortLinks, getAllShortLinks } from '../http/shortLinks'
import { CreatedLinksItem } from './createdLinksItem'


type ShortLink = {
  id: string
  shortCode: string
  originalUrl: string
  hits: number
  createdAt: string
}

export function CreatedLinksList() {
  const [shortLinks, setShortLinks] = useState<ShortLink[]>([])

  async function loadLinks() {
    const links = await getAllShortLinks()
    setShortLinks(links)
  }

  async function handleExport() {
    const result = await exportShortLinks()
    window.open(result.url, '_blank')
  }

  useEffect(() => {
    loadLinks()
  }, [])

  const isLinksListEmpty = shortLinks.length === 0

  return (
    <div className="w-[366px] h-[348px] lg:w-[580px] lg:h-[396px] mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Meus Links</h2>

        <button
          type="button"
          onClick={handleExport}
          className="w-[100px] h-[32px] rounded-sm flex items-center pr-2 gap-2 text-xs font-semibold bg-gray-200 text-gray-500 hover:outline-none hover:ring-1 hover:ring-bluebase cursor-pointer"
        >
          <Download className="w-4 h-4 ml-2 text-gray-600" />
          Baixar CSV
        </button>
      </div>

      <hr className="border-gray-200 mb-2" />

      <ScrollArea.Root type="scroll" className="overflow-hidden">
        <ScrollArea.Viewport className="h-[220px] lg:h-[268px]">
          {isLinksListEmpty ? (
            <span className="flex flex-col items-center mt-4 mb-6">
              <Link className="w-8 h-8 text-gray-400" />
              <p className="text-xs text-gray-500 text-center mt-3">
                AINDA NÃO EXISTEM LINKS CADASTRADOS.
              </p>
            </span>
          ) : (
            <div className="flex flex-col gap-3">
              {shortLinks.map((link) => (
                <CreatedLinksItem
                  key={link.id}
                  link={link}
                  onDeleted={loadLinks}
                />
              ))}
              <hr className="border-gray-200 mb-2" />
            </div>
          )}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex touch-none select-none bg-zinc-100 p-0.5 transition-colors duration-[160ms] ease-out w-2.5"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
