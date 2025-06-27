import { useEffect } from "react";
import { useParams } from "react-router-dom";

import logo from "../assets/404.png";

export function NotFoundPage() {
  return (
    <div className="w-[366px] h-[348px] lg:w-[580px] lg:h-[329px] max-w-screen-lg mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <span className="flex flex-col items-center justify-between mb-4 mt-4 gap-6">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={logo}
            alt="Logo do projeto"
            className="h-auto animate-bounce"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Link não encontrado
        </h2>
        <span className="text-md font-semibold text-center text-gray-600 ">
          <p>
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida.
          </p>
          <p>
            Saiba mais em{" "}
            <button className="font-semibold text-bluebase cursor-pointer">brev.ly.</button>
          </p>
        </span>
      </span>
    </div>
  );
}
