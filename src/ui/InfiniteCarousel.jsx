import { useRef, useEffect, useState } from "react";
import { useGesture } from "@use-gesture/react";

const InfiniteCarousel = ({ images, speed = 1, direction = "left" }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const positionRef = useRef(0);
  const animationRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Animate using rAF without React state updates per frame
  useEffect(() => {
    const animate = () => {
      if (!isDragging && contentRef.current) {
        const singleSetWidth = contentRef.current.scrollWidth / 3; // since tripled
        const dir = direction === "left" ? -1 : 1;
        positionRef.current += dir * speed;

        // Seamless reset
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current = 0;
        }

        contentRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, direction, isDragging]);

  // Drag handling
  const bind = useGesture({
    onDrag: ({ delta: [dx] }) => {
      setIsDragging(true);
      positionRef.current += dx;
      if (contentRef.current)
        contentRef.current.style.transform = `translateX(${positionRef.current}px)`;
    },
    onDragEnd: () => setIsDragging(false),
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}
    >
      <div
        ref={contentRef}
        className="flex"
        style={{ willChange: "transform", touchAction: "none" }}
        {...bind()}
      >
        {/* Triple images for smooth wrap */}
        {[...images, ...images, ...images].map((image, i) => (
          <div
            key={i}
            className="pointer-events-none relative mx-1 flex-shrink-0 sm:mx-2"
          >
            <div className="md:h-34 h-28 w-full overflow-hidden rounded-md">
              <img
                src={image}
                alt={`Slide ${(i % images.length) + 1}`}
                className="h-full w-full select-none object-cover"
                draggable="false"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 rounded-md bg-primary-700/40 transition-colors duration-200 group-hover:bg-primary-700/35" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
