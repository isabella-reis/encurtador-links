import { useState } from 'react'
import { CreateLinkForm } from './createLinkForm'
import { CreatedLinksList } from './createdLinksList'
import logo from '../assets/logo-image.png'

export function CreateLinkWidget() {
  const [refreshList, setRefreshList] = useState(false)

  function triggerRefresh() {
    setRefreshList(prev => !prev)
  }

  return (
    <div className="flex flex-col items-center gap-6 lg:gap-8 max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-center">
        
        {/* Grupo: Logo em cima do formulário */}
        <div className="flex flex-col items-center lg:items-start gap-4">
          <img
            src={logo}
            alt="Logo do projeto"
            className="w-[120px] h-auto lg:absolute lg:top-[210px]"
          />
          <CreateLinkForm onCreate={triggerRefresh} />
        </div>

        {/* Lista de links à direita no desktop */}
        <CreatedLinksList key={String(refreshList)} />
      </div>
    </div>
  )
}
