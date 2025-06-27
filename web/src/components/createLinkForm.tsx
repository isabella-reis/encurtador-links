import { useState } from 'react'
import { createShortLink } from '../http/shortLinks'

interface CreateLinkFormProps {
  onCreate: () => void // para recarregar a lista após criação
}

export function CreateLinkForm({ onCreate }: CreateLinkFormProps) {
  const [originalUrl, setOriginalUrl] = useState('')
  const [customCode, setCustomCode] = useState('')

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    try {
      await createShortLink({
        originalUrl,
        customCode: customCode.replace('brev.ly/', ''),
      })

      setOriginalUrl('')
      setCustomCode('')
      onCreate()
    } catch (error) {
      alert('Erro ao criar link. Verifique os campos.')
    }
  }

  return (
    <div className="w-[366px] h-[316px] lg:w-[400px] lg:h-[396px] mx-auto bg-white rounded-2xl shadow-md p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Novo Link</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="originalUrl" className="text-xs text-gray-500 mb-2">
            LINK ORIGINAL
          </label>
          <input
            id="originalUrl"
            type="url"
            placeholder="www.exemplo.com.br"
            className="h-[48px] px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-bluebase text-md text-gray-600"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="shortUrl" className="text-xs text-gray-500 mb-2">
            LINK ENCURTADO
          </label>
          <div className="relative">
            <input
              id="shortUrl"
              type="text"
              placeholder="brev.ly/"
              className="h-[48px] w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-bluebase text-md text-gray-600"
              value={`brev.ly/${customCode.replace('brev.ly/', '')}`}
              onChange={(e) => setCustomCode(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="h-[48px] bg-bluebase hover:bg-bluedark cursor-pointer text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Salvar link
        </button>
      </form>
    </div>
  )
}
