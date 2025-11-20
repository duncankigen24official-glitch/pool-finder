import PageLayout from "@/components/layout/PageLayout";

const MyTrip = () => {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">My Trip</h2>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MyTrip;
