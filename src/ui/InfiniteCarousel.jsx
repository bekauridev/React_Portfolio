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
  }, []);

  // Animation loop with seamless reset
  const animate = (timestamp) => {
    if (!isDragging) {
      setTranslateX((prev) => {
        let newX;
        if (direction === "left") {
          newX = prev - speed * 2; // Scroll to the left
        } else {
          newX = prev + speed * 2; // Scroll to the right
        }

        // Reset position seamlessly when reaching end
        if (direction === "left" && newX <= -totalWidth.current) {
          newX += totalWidth.current;
        } else if (direction === "right" && newX >= 0) {
          newX -= totalWidth.current;
        }
        return newX;
      });
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isDragging, direction, speed]);

  // Drag gesture handling
  const bind = useGesture({
    onDrag: ({ movement: [mx], delta: [dx] }) => {
      if (!isDragging) setIsDragging(true);
      setTranslateX((prev) => {
        let newX = prev + dx * 0.5;

        // Handle continuous drag wrapping
        if (newX <= -totalWidth.current) newX += totalWidth.current;
        if (newX >= 0) newX -= totalWidth.current;
        return newX;
      });
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
        {/* Double the content for seamless looping */}
        {[...images, ...images].map((image, index) => (
          <div key={index} className="relative mx-2 flex-shrink-0">
            <div className="md:h-34 pointer-events-none h-28 w-full overflow-hidden rounded-md">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
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
