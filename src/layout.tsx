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
  const headerHiddenRoutes = new Set(["/loading"]);
  const hasMutedBackground = mutedBackgroundRoutes.has(pathname);
  const hideHeader = headerHiddenRoutes.has(pathname);

  return (
    <AdminCountryProvider>
      <div
        className={hasMutedBackground ? "min-h-screen bg-muted" : "min-h-screen"}
      >
        {!hideHeader ? <ProjectsHeader /> : null}
        {children}
      </div>
    </AdminCountryProvider>
  );
}

export { Layout };
