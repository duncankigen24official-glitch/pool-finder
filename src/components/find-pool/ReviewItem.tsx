interface ReviewItemProps {
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

const ReviewItem = ({ userName, userImage, rating, date, comment }: ReviewItemProps) => {
  return (
    <div className="py-4 border-b border-border last:border-b-0">
      <div className="flex items-start gap-3 mb-2">
        <img
          src={userImage}
          alt={userName}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{userName}</h4>
            <span className="text-xs text-muted-foreground">{date}</span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < rating ? "text-warning" : "text-muted"}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{comment}</p>
    </div>
  );
};

export default ReviewItem;
