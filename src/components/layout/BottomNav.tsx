import { NavLink } from "react-router-dom";
import { Search, Car, MapPin, User } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { to: "/find-pool", icon: Search, label: "Find Pool" },
    { to: "/offer-pool", icon: Car, label: "Offer Pool" },
    { to: "/my-trip", icon: MapPin, label: "My Trip" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
