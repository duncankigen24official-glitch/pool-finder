import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const MyCar = () => {
  const navigate = useNavigate();

  const cars = [
    {
      id: 1,
      name: "Audi A4",
      details: "Sedan | Black | NYC 5514",
      seats: "4 seat",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Toyota Matrix",
      details: "Hatchbacks | blue | NYC 5514",
      seats: "4 seat",
      image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=300&h=200&fit=crop",
    },
  ];

  return (
    <PageLayout title="My car" showBackButton>
      <div className="px-4 py-6 space-y-4 min-h-[calc(100vh-12rem)]">
        {/* Car List */}
        <div className="space-y-4 flex-1">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
            >
              <div className="space-y-1 flex-1">
                <h3 className="text-lg font-semibold text-primary">{car.name}</h3>
                <p className="text-sm text-foreground">{car.details}</p>
                <p className="text-sm text-muted-foreground">{car.seats}</p>
              </div>
              <img
                src={car.image}
                alt={car.name}
                className="w-24 h-20 object-cover rounded-md"
              />
            </div>
          ))}
        </div>

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
    </PageLayout>
  );
};

export default MyCar;
