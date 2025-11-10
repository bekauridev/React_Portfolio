import { useState, useRef, useEffect } from "react";
import { useGesture } from "@use-gesture/react";

const InfiniteCarousel = ({ images, speed = 1, direction = "left" }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const totalWidth = useRef(0);
  const requestRef = useRef(null);

  // Initialize content width
  useEffect(() => {
    if (contentRef.current) {
      // Get the width of just one set of images
      const firstChild = contentRef.current.firstChild;
      if (firstChild) {
        totalWidth.current = firstChild.offsetWidth * images.length;
      }
    }
  }, [images]);

  // Animation loop with seamless scrolling
  const animate = () => {
    if (!isDragging) {
      setTranslateX((prev) => {
        let newX = direction === "left" ? prev - speed : prev + speed;

        // Seamless loop: reset position when one full set has scrolled
        if (direction === "left" && newX <= -totalWidth.current) {
          return newX + totalWidth.current; // Jump back by exactly one set width
        } else if (direction === "right" && newX >= 0) {
          return newX - totalWidth.current;
        }

        return newX;
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isDragging, direction, speed, images]);

  // Drag gesture handling
  const bind = useGesture({
    onDrag: ({ movement: [mx], delta: [dx] }) => {
      if (!isDragging) setIsDragging(true);
      setTranslateX((prev) => prev + dx);
    },
    onDragEnd: () => {
      setIsDragging(false);
    },
  });

  return (
    <div
      className="relative w-full overflow-hidden"
      ref={containerRef}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}
    >
      <div
        className="flex"
        ref={contentRef}
        style={{
          transform: `translateX(${translateX}px)`,
          touchAction: "none",
          willChange: "transform",
        }}
        {...bind()}
      >
        {/* Duplicate images for seamless looping */}
        {[...images, ...images].map((image, index) => (
          <div key={index} className="relative mx-1 flex-shrink-0 sm:mx-2">
            <div className="md:h-34 pointer-events-none h-28 w-full overflow-hidden rounded-md">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                loading="eager"
                className="h-full w-full object-cover"
                draggable="false"
              />
            </div>

            <div className="transition-bg absolute inset-0 rounded-md bg-primary-700/40 duration-200 group-hover:bg-primary-700/35" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default InfiniteCarousel;
