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
      totalWidth.current = contentRef.current.scrollWidth / 2;
    }
  }, [images]);

  // Animation loop with seamless scrolling
  const animate = () => {
    if (!isDragging) {
      setTranslateX((prev) => {
        let newX = direction === "left" ? prev - speed : prev + speed;

        // Seamless transition without resetting abruptly
        if (direction === "left" && newX <= -totalWidth.current) {
          return 0; // Restart without jump
        } else if (direction === "right" && newX >= 0) {
          return -totalWidth.current;
        }

        return newX;
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
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
          transition: isDragging ? "none" : "transform 0s linear",
        }}
        {...bind()}
      >
        {/* Duplicate images for seamless looping */}
        {[...images, ...images].map((image, index) => (
          <div key={index} className="relative mx-2 flex-shrink-0">
            <div className="md:h-34 pointer-events-none h-28 w-full overflow-hidden rounded-md">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover"
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
