import { Star } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
  reviewCount: number;
}

export function ReviewStars({ rating, reviewCount }: ReviewStarsProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-dark-gray">
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((index) => (
          <Star key={index} size={14} className="fill-gold text-gold" />
        ))}
      </div>
      <span>{rating.toFixed(1)}</span>
      <span>({reviewCount})</span>
    </div>
  );
}
