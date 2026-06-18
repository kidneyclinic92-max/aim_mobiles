import { Star } from "lucide-react";
import type { ProductReview } from "@/lib/types";

type ReviewsProps = {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
};

export function Reviews({ reviews, rating, reviewCount }: ReviewsProps) {
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
    return { stars, count, pct };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold text-white">{rating}</span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Based on {reviewCount.toLocaleString()} reviews
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 w-full max-w-xs">
          {distribution.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-3 text-sm">
              <span className="w-3 text-gray-400">{stars}</span>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-500 text-xs">
                {Math.round(pct)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-sm font-bold text-cyan-400">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {review.author}
                      {review.verified && (
                        <span className="ml-2 text-xs text-emerald-400">
                          Verified Purchase
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
              <h4 className="mt-3 font-medium text-white">{review.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
}
