import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MainPage } from "@/pages";
import { Layout } from "@/layout";

import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <MainPage />
    </Layout>
  </StrictMode>,
);
