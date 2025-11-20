import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ReviewItem from "@/components/find-pool/ReviewItem";

const AllReviews = () => {
  const { id } = useParams();

  // Mock data
  const reviews = [
    {
      userName: "Cameron Williamson",
      userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      rating: 4,
      date: "9 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
    {
      userName: "Cameron Williamson",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: 5,
      date: "8 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
    {
      userName: "Brooklyn Simmons",
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      rating: 3,
      date: "7 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
    {
      userName: "Leslie Alexander",
      userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      rating: 4,
      date: "6 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
    {
      userName: "Albert Flores",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      rating: 5,
      date: "5 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
    {
      userName: "Guy Hawkins",
      userImage: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
      rating: 4,
      date: "4 June 2023",
      comment: "Lorem ipsum dolor sit aconsectetur PIgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd.",
    },
  ];

  return (
    <PageLayout title="Review" hideBottomNav showBackButton>
      <div className="divide-y divide-border">
        {reviews.map((review, index) => (
          <ReviewItem key={index} {...review} />
        ))}
      </div>
    </PageLayout>
  );
};

export default AllReviews;
