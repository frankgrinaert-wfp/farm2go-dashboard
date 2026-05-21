import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/layout";
import { MainPage } from "@/pages";
import { AggregatorsPage } from "@/pages/aggregators-page";
import { BuyersPage } from "@/pages/buyers-page";
import { FarmersPage } from "@/pages/farmers-page";
import { MetricDetailPage } from "@/pages/metric-detail-page";

import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/aggregators" element={<AggregatorsPage />} />
          <Route path="/buyers" element={<BuyersPage />} />
          <Route path="/overview/metrics/:slug" element={<MetricDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
);
