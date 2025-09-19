import type { ReactNode } from "react";
import { Footer } from "./Footer";
import Navigation from "./Navigation";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-background border-b">
        <Navigation />
      </div>

      <main className="grow">{children}</main>

      <Footer />
    </div>
  );
}
export default PublicLayout;
