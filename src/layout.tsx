import { ProjectsHeader } from "@/components/header";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

function Layout({ children }: IProps) {
  return (
    <div className="min-h-screen">
      <ProjectsHeader />
      {children}
    </div>
  );
}

export { Layout };
