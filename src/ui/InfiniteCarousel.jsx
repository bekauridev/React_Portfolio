import Marquee from "react-fast-marquee";

const InfiniteCarousel = ({ images }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="m-auto mb-2 w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, gray 50%, gray 50%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, gray 50%, gray 10%, transparent)",
        }}
      >
        <Marquee className="ml-2 overflow-hidden" speed={50} pauseOnHover={false}>
          {images.map((image, index) => (
            <div key={index} className="relative mx-2">
              <div className="md:h-34 h-28 w-full overflow-hidden rounded-md">
                <img
                  src={image} // Change to image.src if using an object
                  alt={`Slide ${index + 1}`}
                  className="box-content h-full w-full object-cover"
                />
              </div>
              {/* Add a semi-transparent gray overlay */}
              <div className="backdrop absolute inset-0 rounded-lg bg-primary-800/20"></div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default InfiniteCarousel;

// Carusel interactivity test
// import React, { useState, useRef, useEffect } from "react";
// import { useGesture } from "@use-gesture/react";

// const InfiniteCarousel = ({ images, speed = 1 }) => {
//   const containerRef = useRef(null);
//   const contentRef = useRef(null);
//   const [translateX, setTranslateX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const animationRef = useRef(null);
//   const lastTimeRef = useRef(null);
//   const totalWidth = useRef(0);

//   // Initialize content width and set up animation
//   useEffect(() => {
//     if (contentRef.current) {
//       totalWidth.current = contentRef.current.scrollWidth / 2;
//     }

//     const animate = (timestamp) => {
//       if (!lastTimeRef.current) lastTimeRef.current = timestamp;
//       const delta = timestamp - lastTimeRef.current;

//       if (!isDragging) {
//         setTranslateX((prev) => {
//           const newX = prev - speed * delta * 0.1;
//           // Loop seamlessly without resetting abruptly
//           return newX <= -totalWidth.current ? newX + totalWidth.current : newX;
//         });
//       }

//       lastTimeRef.current = timestamp;
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationRef.current);
//   }, [isDragging, speed]);

//   // Gesture handling for smooth dragging
//   const bind = useGesture({
//     onDrag: ({ movement: [mx], delta: [dx], first }) => {
//       if (first) setIsDragging(true); // Pause animation on drag start
//       setTranslateX((prev) => {
//         const newX = prev + dx * 0.5; // Scale down drag speed for better control
//         // Ensure seamless looping
//         if (newX <= -totalWidth.current) return newX + totalWidth.current;
//         if (newX >= 0) return newX - totalWidth.current;
//         return newX;
//       });
//     },
//     onDragEnd: () => {
//       setIsDragging(false); // Resume animation on drag end
//     },
//   });

//   return (
//     <div className="relative w-full overflow-hidden" ref={containerRef}>
//       <div
//         className="flex"
//         style={{
//           transform: `translateX(${translateX}px)`,
//           transition: isDragging ? "none" : "transform 0.3s ease-out",
//           touchAction: "none", // Fix touch-action warning
//         }}
//         {...bind()}
//         ref={contentRef}
//       >
//         {/* Double the content for seamless looping */}
//         {[...images, ...images].map((image, index) => (
//           <div key={index} className="relative mx-2 flex-shrink-0">
//             <div className="md:h-34 h-28 w-full overflow-hidden rounded-md">
//               <img
//                 src={image}
//                 alt={`Slide ${index + 1}`}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <div className="absolute inset-0 rounded-lg bg-primary-800/20" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InfiniteCarousel;
