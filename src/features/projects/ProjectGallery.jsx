import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useFancybox from "../../hooks/useFancybox";

const MOBILE_COUNT = 1;
const TABLET_COUNT = 2;
const DESKTOP_COUNT = 3;

function ProjectGallery({ name, gallery = [] }) {
  const [visibleImages, setVisibleImages] = useState(DESKTOP_COUNT);
  const [fancyboxRef] = useFancybox({});

  useEffect(() => {
    const updateVisibleImages = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) setVisibleImages(MOBILE_COUNT);
      else if (window.innerWidth < 1024) setVisibleImages(TABLET_COUNT);
      else setVisibleImages(DESKTOP_COUNT);
    };

    updateVisibleImages();
    window.addEventListener("resize", updateVisibleImages);
    return () => window.removeEventListener("resize", updateVisibleImages);
  }, []);

  if (!gallery.length) return null;

  const remainingCount = gallery.length - visibleImages;
  const displayedGallery = gallery.slice(0, visibleImages);

  return (
    <div className="mb-12">
      <h2 className="mb-4 text-2xl font-semibold text-gray-100">Gallery</h2>
      <div
        ref={fancyboxRef}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {displayedGallery.map((img, idx) => {
          const showOverlay = idx === displayedGallery.length - 1 && remainingCount > 0;

          return (
            <a
              key={idx}
              data-fancybox="gallery"
              href={img}
              data-caption={`${name} - image ${idx + 1}`}
              className="relative block overflow-hidden rounded-xl"
            >
              <motion.img
                src={img}
                alt={`Gallery image ${idx + 1}`}
                className="h-56 w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              />
              {showOverlay && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 backdrop-blur-sm">
                  <span className="text-lg font-semibold text-white">
                    +{remainingCount}
                  </span>
                </div>
              )}
            </a>
          );
        })}

        {gallery.slice(visibleImages).map((img, idx) => (
          <a
            key={`hidden-${visibleImages + idx}`}
            data-fancybox="gallery"
            href={img}
            data-caption={`${name} - image ${visibleImages + idx + 1}`}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
export default ProjectGallery;
