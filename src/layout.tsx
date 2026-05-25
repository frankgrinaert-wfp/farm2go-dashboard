import { ProjectsHeader } from "@/components/custom/header";
import { AdminCountryProvider } from "@/contexts/admin-country-context";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps) {
  const { pathname } = useLocation();
  const mutedBackgroundRoutes = new Set(["/"]);
  const hasMutedBackground = mutedBackgroundRoutes.has(pathname);

  return (
    <AdminCountryProvider>
      <div
        className={hasMutedBackground ? "min-h-screen bg-muted" : "min-h-screen"}
      >
        <ProjectsHeader />
        {children}
      </div>
    </AdminCountryProvider>
  );
}

export { Layout };
