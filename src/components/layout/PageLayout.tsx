import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import BottomNav from "./BottomNav";
import { Button } from "@/components/ui/button";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  hideBottomNav?: boolean;
  showBackButton?: boolean;
  showNotification?: boolean;
}

const PageLayout = ({
  children,
  title,
  hideBottomNav = false,
  showBackButton = false,
  showNotification = false,
}: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      {(showBackButton || title || showNotification) && (
        <header className="sticky top-0 z-40 bg-card border-b border-border">
          <div className="flex items-center justify-between h-14 px-4">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(-1)}
                  className="h-9 w-9"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              {title && (
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              )}
            </div>
            {showNotification && (
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-5 w-5" />
              </Button>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={hideBottomNav ? "" : "pb-16"}>{children}</main>

      {/* Bottom Navigation */}
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default PageLayout;
