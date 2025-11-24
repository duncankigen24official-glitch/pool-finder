import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Vehicle {
  id: string;
  vehicle_name: string;
  vehicle_type: string;
  registration_number: string;
  seat_capacity: number;
  facilities: string[];
  image_url: string | null;
}

const MyCar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchVehicles();
    }
  }, [user]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Vehicle deleted successfully');
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      toast.error('Failed to delete vehicle');
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <PageLayout title="My car" showBackButton>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My car" showBackButton>
      <div className="px-4 py-6 space-y-4 min-h-[calc(100vh-12rem)]">
        {/* Car List */}
        {vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <p className="text-muted-foreground text-center">No vehicles added yet</p>
            <Button onClick={() => navigate("/profile/add-car")}>
              Add your first car
            </Button>
          </div>
        ) : (
          <div className="space-y-4 flex-1">
            {vehicles.map((car) => (
              <div
                key={car.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="space-y-1 flex-1">
                  <h3 className="text-lg font-semibold text-primary">{car.vehicle_name}</h3>
                  <p className="text-sm text-foreground">
                    {car.vehicle_type.charAt(0).toUpperCase() + car.vehicle_type.slice(1)} | {car.registration_number}
                  </p>
                  <p className="text-sm text-muted-foreground">{car.seat_capacity} seat{car.seat_capacity > 1 ? 's' : ''}</p>
                  {car.facilities && car.facilities.length > 0 && (
                    <p className="text-xs text-muted-foreground">{car.facilities.join(', ')}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={car.vehicle_name}
                      className="w-24 h-20 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-24 h-20 bg-muted rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">No image</span>
                    </div>
                  )}
                  <button
                    onClick={() => setDeleteId(car.id)}
                    className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Car Button */}
        <div className="sticky bottom-4">
          <Button
            onClick={() => navigate("/profile/add-car")}
            className="w-full h-12 text-base"
          >
            Add new car
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
};

export default MyCar;
