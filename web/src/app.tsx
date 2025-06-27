// src/app.tsx

import { Routes, Route } from "react-router-dom";
import { CreateLinkWidget } from "./components/createLinkWidget";
import { RedirectPage } from "./pages/RedirectPage";
import { NotFoundPage } from "./pages/404";
import { Layout } from "./components/Layout";

export function App() {
  return (
    <Routes>
      {/* Aplica o layout apenas para a home */}
      <Route
        path="/"
        element={
          <Layout>
            <CreateLinkWidget />
          </Layout>
        }
      />

      {/* Redirecionamento sem layout (full screen) */}

      <Route
        path="/:shortCode"
        element={
          <Layout>
            <RedirectPage />
          </Layout>
        }
      />

      {/* Not found também pode ter layout se quiser */}
      <Route
        path="*"
        element={
          <Layout>
            <NotFoundPage />
          </Layout>
        }
      />
    </Routes>
  );
}
