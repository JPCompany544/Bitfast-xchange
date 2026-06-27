"use client";

import { useEffect, useRef } from "react";

const REVIEWS = [
  { name: "Daniel Cinta", text: "It is the best I have used, I have been in the crypto world for a while and I have used several exchanges but this has been by far the one I liked the most, excellent work" },
  { name: "Ron Cave", text: "Superb, super easy to use from sign up to exchanging crypto, would recommend to anyone. Well done team." },
  { name: "Peter Vell", text: "First time I found it easy to use the customer service support is extremely helpful to any problem that you have 5 star's guys keep up the good work" },
  { name: "Chris", text: "Very easy once you get used to it. A lot of decentralized coins available that you cannot as easily get elsewhere. Just take your time and work slow and you will not have any errors." },
  { name: "Pont", text: "Changelly is a very friendly. The Customer Support is second to none." },
  { name: "Kev", text: "Great exchange especially for smaller transactions. Multiple platforms to purchase from and it's instant. Now waiting time depending on your coin." }
];

export default function ReviewsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Scroll by roughly one card width
          const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
          scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: "smooth" }); // 16px gap
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 w-full"
    >
      {REVIEWS.map((review, idx) => (
        <div 
          key={idx} 
          className="snap-start shrink-0 border border-gray-100 rounded-[12px] w-[85vw] sm:w-[350px] lg:w-[420px] p-6 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300 flex flex-col cursor-grab active:cursor-grabbing"
        >
          <h3 className="text-[16px] text-gray-500 flex gap-2 items-center mb-3 font-medium">
            {review.name}
            <div className="flex items-center gap-[2px]">
              {[1, 2, 3, 4, 5].map(i => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13">
                  <path fill="#FFB000" d="M6.524.464a.5.5 0 0 1 .952 0l1.208 3.718a.5.5 0 0 0 .475.346h3.91a.5.5 0 0 1 .294.904L10.2 7.731a.5.5 0 0 0-.182.559l1.209 3.719a.5.5 0 0 1-.77.559l-3.163-2.299a.5.5 0 0 0-.588 0l-3.163 2.299a.5.5 0 0 1-.77-.56L3.982 8.29a.5.5 0 0 0-.182-.56L.636 5.433a.5.5 0 0 1 .294-.904h3.91a.5.5 0 0 0 .476-.346z" />
                </svg>
              ))}
            </div>
          </h3>
          <p className="text-[16px] leading-[1.6] text-gray-900 font-medium">
            "{review.text}"
          </p>
        </div>
      ))}
    </div>
  );
}
