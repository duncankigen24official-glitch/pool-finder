import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Car, 
  History, 
  Globe, 
  FileText, 
  Shield, 
  HelpCircle, 
  LogOut,
  Wallet,
  ChevronRight
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: "Edit profile", path: "/profile/edit" },
    { icon: Car, label: "My car", path: "/profile/my-car" },
    { icon: History, label: "Ride history", path: "/profile/ride-history" },
    { icon: Globe, label: "Language", path: "/profile/language" },
    { icon: FileText, label: "Terms & condition", path: "/profile/terms" },
    { icon: Shield, label: "Privacy policy", path: "/profile/privacy" },
    { icon: HelpCircle, label: "Help & support", path: "/profile/help" },
  ];

  return (
    <PageLayout title="PROFILE">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Courtney Henry</h2>
            <p className="text-sm text-muted-foreground">+91 123456789</p>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="h-5 w-5 text-primary" />
            <span className="text-base font-medium text-foreground">Wallet</span>
          </div>
          <span className="text-lg font-semibold text-primary">$110.00</span>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-lg border border-border divide-y divide-border">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center justify-between p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-foreground" />
                <span className="text-base text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => {
            // Handle logout
            console.log("Logout");
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </PageLayout>
  );
};

export default Profile;
