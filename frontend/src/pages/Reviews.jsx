import React, { useState } from "react";
import { Star, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { reviews } from "../mock";

const Reviews = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={20}
        className={
          index < rating ? "fill-[#BF9B30] text-[#BF9B30]" : "text-gray-300"
        }
      />
    ));
  };

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1);
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1D39] to-[#1a2f4d] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Veteran Success Stories
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Read how All4Vets has helped veterans secure the benefits and
              support they deserve.
            </p>

            {/* Rating Summary */}
            <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(5)}
              </div>
              <p className="text-3xl font-bold">{averageRating} out of 5</p>
              <p className="text-sm text-gray-300">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 bg-[#F3F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote size={32} className="text-[#BF9B30] opacity-30" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Title */}
                  <h3 className="text-xl font-bold text-[#0B1D39] mb-3">
                    {review.title}
                  </h3>

                  {/* Review Text */}
                  <p className="text-[#3C4A5B] leading-relaxed mb-6">
                    {review.review}
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-[#0B1D39]">{review.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="bg-[#0B1D39] text-white text-xs"
                        >
                          {review.branch}
                        </Badge>
                        <span className="text-sm text-[#3C4A5B]">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show More Button */}
          {!showAll && reviews.length > 3 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => setShowAll(true)}
                className="bg-[#0B1D39] hover:bg-[#1a2f4d] text-white font-bold px-8 py-6 text-lg rounded-full"
              >
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1D39] uppercase tracking-tight mb-4">
              Our Impact by the Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-[#BF9B30] mb-2">
                5,000+
              </div>
              <p className="text-lg text-[#3C4A5B] font-semibold">
                Veterans Served
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#BF9B30] mb-2">
                $25M+
              </div>
              <p className="text-lg text-[#3C4A5B] font-semibold">
                Benefits Secured
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#BF9B30] mb-2">92%</div>
              <p className="text-lg text-[#3C4A5B] font-semibold">
                Success Rate
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#BF9B30] mb-2">
                4.9/5
              </div>
              <p className="text-lg text-[#3C4A5B] font-semibold">
                Average Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0B1D39] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of veterans who have successfully navigated their
            benefits journey with All4Vets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#B31942] hover:bg-[#d43e2e] text-white font-bold px-8 py-6 text-lg rounded-full">
              Apply for Aid
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#0B1D39] font-bold px-8 py-6 text-lg rounded-full"
            >
              Leave a Review
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reviews;
