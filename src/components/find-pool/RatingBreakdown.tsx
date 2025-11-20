interface RatingBreakdownProps {
  overallRating: number;
  totalReviews: number;
  breakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const RatingBreakdown = ({ overallRating, totalReviews, breakdown }: RatingBreakdownProps) => {
  return (
    <div className="bg-card rounded-xl p-6 mb-4">
      <h3 className="text-center text-foreground font-semibold text-lg mb-4">
        Overall rating
      </h3>

      <div className="flex items-start gap-6">
        {/* Overall Score */}
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground mb-1">{overallRating}</div>
          <div className="flex items-center gap-0.5 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(overallRating) ? "text-warning" : "text-muted"}>
                ★
              </span>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">({totalReviews} Review)</div>
        </div>

        {/* Rating Bars */}
        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = breakdown[star as keyof typeof breakdown];
            const percentage = (count / totalReviews) * 100;
            
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-12">{star} star</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {count.toString().padStart(2, '0')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
