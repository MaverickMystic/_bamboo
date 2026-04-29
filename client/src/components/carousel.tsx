import React from "react";
import Carousel from "react-multi-carousel";
import type { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

interface Props {
  deviceType?: string;
}

const images: string[] = [
  "https://i.pinimg.com/1200x/ae/e0/34/aee03494e110eb586795f8ed4253ae54.jpg",
  "https://i.pinimg.com/736x/8e/72/c9/8e72c93ec9de297a8e3458b141877caf.jpg",
  "https://i.pinimg.com/1200x/59/48/86/594886432c38536580bee2e45b24f46a.jpg",
  "https://i.pinimg.com/736x/c5/ea/6b/c5ea6be373e220484d009d1c25586602.jpg",
  "https://i.pinimg.com/1200x/ae/e0/34/aee03494e110eb586795f8ed4253ae54.jpg",
  "https://i.pinimg.com/736x/8e/72/c9/8e72c93ec9de297a8e3458b141877caf.jpg",
  "https://i.pinimg.com/1200x/59/48/86/594886432c38536580bee2e45b24f46a.jpg",
  "https://i.pinimg.com/736x/c5/ea/6b/c5ea6be373e220484d009d1c25586602.jpg",
];

const MyCarousel: React.FC<Props> = ({ deviceType }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}    
        arrows={true}  
        responsive={responsive}
        ssr={true}
        infinite={true}   
        autoPlay={true}  
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        deviceType={deviceType}
      >
        {images.map((img, index) => (
          <div key={index} className="p-2">
            <img draggable={false}
              src={img} 
              alt={`Slide ${index}`}
              className="w-64 h-48 object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
