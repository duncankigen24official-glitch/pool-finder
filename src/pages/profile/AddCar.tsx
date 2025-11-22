import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const AddCar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleName: "",
    regNumber: "",
    seatOffering: "",
    facilities: "",
  });

  const handleAdd = () => {
    toast.success("Car added successfully");
    navigate("/profile/my-car");
  };

  return (
    <PageLayout title="Add new car" showBackButton>
      <div className="px-4 py-6 space-y-6">
        {/* Vehicle Image Upload */}
        <div className="flex flex-col items-center gap-3">
          <button className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary" />
          </button>
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
          className="w-full h-12 text-base"
        >
          Add
        </Button>
      </div>
    </PageLayout>
  );
};

export default AddCar;
