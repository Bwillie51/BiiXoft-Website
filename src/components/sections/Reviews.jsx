// src/components/sections/Reviews.jsx
import React, { useEffect, useState } from 'react'
import { sanityClient } from '../../lib/sanityClient'

export default function Reviews({ onLeaveReviewClick }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // GROQ Query fetches ONLY approved documents to guarantee filtration control
    const query = `*[_type == "feedback" && approved == true] | order(_createdAt desc)`
    
    sanityClient.fetch(query)
      .then((data) => {
        setReviews(data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching feedbacks:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="text-center py-24 text-muted-foreground font-medium">
        Loading customer reviews...
      </div>
    )
  }

  return (
    <section id="reviews" className="py-24 bg-background border-y border-border w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Header Elements */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            Customer Feedbacks
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Dynamic Responsive Viewport Grid */}
        {/* Mobile: 1 card | Tablet/Medium: 2 cards | Large Desktop: 3 cards */}
        {reviews.length === 0 ? (
          <p className="text-center text-muted-foreground italic py-8">
            No reviews published yet. Be the first to leave one!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {reviews.map((item) => (
              <div 
                key={item._id}
                className="bg-card border border-border/60 p-6 sm:p-8 rounded-3xl relative shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Star Indicator Utility Layout */}
                  <div className="flex space-x-0.5 mb-4 text-amber-500 text-lg select-none">
                    {'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}
                  </div>

                  {/* Comment Wrapper Block Markup */}
                  <p className="text-muted-foreground text-sm sm:text-base font-medium italic leading-relaxed mb-6">
                    "{item.comment}"
                  </p>
                </div>

                {/* Client Profile Sub-Header Info Container */}
                <div className="border-t border-border/80 pt-4 mt-auto">
                  <h4 className="text-foreground font-black text-sm sm:text-base">
                    {item.client}
                  </h4>
                  {item.role && (
                    <p className="text-muted-foreground text-xs font-semibold mt-0.5 uppercase tracking-wider">
                      {item.role}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive CTA Navigation Trigger Hooking into App.jsx Modal state */}
        <div className="text-center mt-12">
          <button 
            onClick={onLeaveReviewClick}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold shadow-sm hover:bg-blue-700 transition-all duration-200 cursor-pointer"
          >
            Leave a Review
          </button>
        </div>

      </div>
    </section>
  )
}
