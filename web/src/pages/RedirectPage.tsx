import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOriginalUrlByShortCode } from "../http/shortLinks";

import logo from "../assets/Logo_Icon.png";
import { NotFoundPage } from "./404";

export function RedirectPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function redirect() {
      try {
        const response = await getOriginalUrlByShortCode(shortCode!);
        window.location.href = response;
      } catch (err) {
         setNotFound(true);
      }
    }

    redirect();
  }, [shortCode]);

  if (notFound) return <NotFoundPage />;

  return (
    <div className="w-[366px] h-[348px] lg:w-[580px] lg:h-[296px] max-w-screen-lg mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <span className="flex flex-col items-center justify-between mb-4 mt-4 gap-6">
        <div className="flex flex-col items-center lg:items-start">
          <img
            src={logo}
            alt="Logo do projeto"
            className="w-[48px] h-auto animate-pulse"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Redirecionando...</h2>
        <span className="text-md font-semibold text-center text-gray-600 ">
          <p>O link será aberto automaticamente em alguns instantes.</p>
          <p>
            Não foi redirecionado?{" "}
            <button className="font-semibold text-bluebase">
              Acesse aqui.
            </button>
          </p>
        </span>
      </span>
    </div>
  );
}
