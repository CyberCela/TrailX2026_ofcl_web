import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="trailx-shell trailx-glow min-h-screen">
      <SiteHeader />
      <main className="flex flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
