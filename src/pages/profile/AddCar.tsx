import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const AddCar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleName: "",
    regNumber: "",
    seatOffering: "",
    facilities: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5242880) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile || !user) return null;

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('vehicle-images')
      .upload(fileName, imageFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleAdd = async () => {
    if (!user) {
      toast.error("You must be logged in to add a car");
      return;
    }

    if (!formData.vehicleType || !formData.vehicleName || !formData.regNumber || !formData.seatOffering) {
      toast.error("Please fill all required fields");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const facilitiesArray = formData.facilities
        .split(',')
        .map(f => f.trim())
        .filter(f => f);

      const { error } = await supabase
        .from('vehicles')
        .insert({
          user_id: user.id,
          vehicle_type: formData.vehicleType,
          vehicle_name: formData.vehicleName,
          registration_number: formData.regNumber,
          seat_capacity: parseInt(formData.seatOffering),
          facilities: facilitiesArray,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast.success("Car added successfully");
      navigate("/profile/my-car");
    } catch (error) {
      console.error('Error adding car:', error);
      toast.error("Failed to add car");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageLayout title="Add new car" showBackButton>
      <div className="px-4 py-6 space-y-6">
        {/* Vehicle Image Upload */}
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="vehicle-image" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img src={previewUrl} alt="Vehicle" className="w-full h-full object-cover" />
              ) : (
                <Camera className="h-8 w-8 text-primary" />
              )}
            </div>
            <input
              id="vehicle-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <p className="text-sm text-foreground font-medium">Add vehicle image</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicleType">Vehicle type</Label>
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
            >
              <SelectTrigger className="rounded-lg">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="wagon">Wagon</SelectItem>
                <SelectItem value="minivan">Minivan</SelectItem>
                <SelectItem value="truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleName">Vehicle name</Label>
            <Input
              id="vehicleName"
              placeholder="Enter vehicle name"
              value={formData.vehicleName}
              onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regNumber">Vehicle reg. number</Label>
            <Input
              id="regNumber"
              placeholder="Enter vehicle reg. number"
              value={formData.regNumber}
              onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seatOffering">Seat offering</Label>
            <Input
              id="seatOffering"
              placeholder="Enter available seat"
              type="number"
              value={formData.seatOffering}
              onChange={(e) => setFormData({ ...formData, seatOffering: e.target.value })}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facilities">Facilities(i.e AC,Extra luggage etc.)</Label>
            <Input
              id="facilities"
              placeholder="Enter facilities"
              value={formData.facilities}
              onChange={(e) => setFormData({ ...formData, facilities: e.target.value })}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Add Button */}
        <Button 
          onClick={handleAdd}
          disabled={uploading}
          className="w-full h-12 text-base"
        >
          {uploading ? "Adding..." : "Add"}
        </Button>
      </div>
    </PageLayout>
  );
};

export default AddCar;
