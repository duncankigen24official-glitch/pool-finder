import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileData {
  full_name: string | null;
  phone_number: string | null;
  email: string;
  avatar_url: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, phone_number, email, avatar_url')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to logout');
    }
  };

  const menuItems = [
    { icon: User, label: "Edit profile", path: "/profile/edit" },
    { icon: Car, label: "My car", path: "/profile/my-car" },
    { icon: History, label: "Ride history", path: "/profile/ride-history" },
    { icon: Globe, label: "Language", path: "/profile/language" },
    { icon: FileText, label: "Terms & condition", path: "/profile/terms" },
    { icon: Shield, label: "Privacy policy", path: "/profile/privacy" },
    { icon: HelpCircle, label: "Help & support", path: "/profile/help" },
  ];

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <PageLayout title="PROFILE">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="PROFILE">
      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-24 w-24">
            {profile?.avatar_url ? (
              <AvatarImage src={profile.avatar_url} />
            ) : (
              <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">
              {profile?.full_name || "User"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {profile?.phone_number || profile?.email}
            </p>
          </div>
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
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </PageLayout>
  );
};

export default Profile;
