import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scissors, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const navigation = [
    { name: t.home, href: "/" },
    { name: t.services, href: "/services" },
    { name: t.bookAppointment, href: "/book" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Scissors className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-foreground">Elite Cuts</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Language Switcher and Admin Login */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  {t.adminLogin}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <LanguageSwitcher />
                </div>
                <Link
                  to="/admin"
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.adminLogin}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="h-6 w-6 text-accent" />
                <span className="text-lg font-bold">Elite Cuts</span>
              </div>
              <p className="text-muted-foreground">
                {t.professionalBarbershopFooter}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.contactInfo}</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t.address}</p>
                <p>{t.copenhagen}, {t.denmark}</p>
                <p>{t.phone}</p>
                <p>{t.email}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.hours}</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>{t.mondayFriday}</p>
                <p>{t.saturday}</p>
                <p>{t.sunday}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 Elite Cuts. {t.allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}