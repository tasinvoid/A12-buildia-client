import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const comments = [
  {
    name: "Alex Johnson",
    handle: "@alexj",
    avatar: "https://i.pravatar.cc/150?u=a",
    comment:
      "This is an absolutely amazing product! The user interface is intuitive and the performance is top-notch. Highly recommend it!",
    date: "2025-08-10",
  },
  {
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: "https://i.pravatar.cc/150?u=b",
    comment:
      "A game-changer for my workflow. The features are exactly what I needed, and the support team is incredibly responsive.",
    date: "2025-08-08",
  },
  {
    name: "Michael Davis",
    handle: "@michaeld",
    avatar: "https://i.pravatar.cc/150?u=c",
    comment:
      "Sleek design and powerful capabilities. It has significantly improved my efficiency. Great job!",
    date: "2025-08-05",
  },
];

const CommentSwiper = () => {
  return (
    <div className="bg-gray-950 text-gray-100 p-8 rounded-lg shadow-xl bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 max-w-4xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-gray-100 text-center mb-6">
        User Comments
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-container",
        }}
      >
        {comments.map((comment, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                {}
                <div className="flex items-center mb-4">
                  <img
                    src={comment.avatar}
                    alt={`Avatar of ${comment.name}`}
                    className="w-12 h-12 rounded-full ring-2 ring-indigo-500 object-cover mr-4"
                  />
                  <div>
                    <p className="text-gray-100 font-semibold text-lg">
                      {comment.name}
                    </p>
                    <p className="text-gray-400 text-sm">{comment.handle}</p>
                  </div>
                </div>
                {}
                <p className="text-gray-300 leading-relaxed italic mb-4">
                  "{comment.comment}"
                </p>
                {}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{comment.date}</span>
                  <div className="flex space-x-1 text-yellow-400">
                    {}
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.487 6.61l6.568-.955L10 0l2.945 5.655 6.568.955-4.758 4.935 1.123 6.545z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {}

        {}
        <div className="swiper-pagination-container flex justify-center items-center mt-6 space-x-2"></div>
      </Swiper>
    </div>
  );
};

export default CommentSwiper;
