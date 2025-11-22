import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Check } from "lucide-react";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Courtney henry",
    mobile: "+91 1234567890",
    email: "courtney@example.com",
    governmentId: "GovernmentId.pdf",
    drivingLicense: "Drivinglicence.jpg",
  });

  const handleUpdate = () => {
    toast.success("Profile updated successfully");
    navigate("/profile");
  };

  return (
    <PageLayout title="Edit profile" showBackButton>
      <div className="px-4 py-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" />
              <AvatarFallback>CH</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
              <Camera className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile number</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="govId">Government id</Label>
            <div className="flex items-center justify-between bg-background border border-input rounded-lg px-4 py-3">
              <span className="text-primary">{formData.governmentId}</span>
              <Check className="h-5 w-5 text-green-500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license">Driving license</Label>
            <div className="flex items-center justify-between bg-background border border-input rounded-lg px-4 py-3">
              <span className="text-primary">{formData.drivingLicense}</span>
              <Check className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        {/* Update Button */}
        <Button 
          onClick={handleUpdate}
          className="w-full h-12 text-base"
        >
          Update
        </Button>
      </div>
    </PageLayout>
  );
};

export default EditProfile;
