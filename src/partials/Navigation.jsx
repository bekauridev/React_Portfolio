import { useState, useRef, useEffect } from "react";

// Icons
import { IoClose } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaNewspaper } from "react-icons/fa";
import { MdMail, MdOutlineWork } from "react-icons/md";

import logoX1 from "../assets/images/logos/logo@x1.webp";
import logoX2 from "../assets/images/logos/logo@x2.webp";
import logoX3 from "../assets/images/logos/logo@x3.webp";
import logoX4 from "../assets/images/logos/logo@x4.webp";
import Button from "../ui/Button";

import useMeasure from "react-use-measure";
import { useDragControls, useMotionValue, useAnimate, motion } from "framer-motion";
import { useNavigate } from "react-router";

function Navigation({ onOpenModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeBtnRef = useRef(null);
  const navigate = useNavigate();

  const [drawerRef, { height }] = useMeasure();
  const [scope, animate] = useAnimate();
  const controls = useDragControls();
  const y = useMotionValue(0);

  const handleClose = async () => {
    // Ensure the drawer moves down first
    await animate("#drawer", { y: height, opacity: 0 });

    // Then fade out the background overlay
    // await animate(scope.current, { opacity: 0 });

    setIsMenuOpen(false);
  };

  // Function to handle clicks outside the drawer
  const handleOverlayClick = async (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Disable scrolling when the menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when the menu is closed
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  return (
    <>
      <nav className="max-w-auto sticky top-0 z-20 m-auto overflow-hidden md:static">
        <div
          className="mx-2 mb-5 mt-4 rounded-xl border border-slate-700/30 bg-primary-900 px-6 shadow-md backdrop-blur-sm md:px-4"
          style={{ backdropFilter: "blur(1px)" }}
        >
          <div className="flex h-16 items-center justify-between">
            <Button
              callBack={() => {
                setTimeout(() => navigate("/"), 400);
              }}
              targetBlank={false}
              type="none"
              className="group"
            >
              <div className="flex items-center justify-center gap-1.5">
                {/* Spinning Logo */}
                <div className="h-8 w-8 transition-transform duration-700 group-hover:rotate-[360deg]">
                  <img
                    src={logoX1}
                    srcSet={`
                      ${logoX1} 1x,
                      ${logoX2} 2x,
                      ${logoX3} 3x,
                      ${logoX4} 4x
                    `}
                    alt="website logo"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>

                {/* Flipping Text */}
                <p className="text-xl font-bold text-gray-200 transition-all duration-[750ms] group-hover:text-primary-100">
                  BekauriDev
                </p>
              </div>
            </Button>

            {/* Desktop Menu */}
            <div className="hidden md:flex">
              <Button to="/projects" targetBlank={false} type="plain">
                Projects
              </Button>
              <Button
                type="plain"
                callBack={() => {
                  onOpenModal("contact");
                  setIsMenuOpen(false);
                }}
              >
                Contact
              </Button>

              <Button type="plain" callBack={() => onOpenModal("blog")}>
                Blog
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="pt-1 md:hidden">
              <button
                aria-label="Open menu"
                ref={closeBtnRef}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-block text-white hover:text-primary-300 focus:outline-none"
              >
                {/* {!isMenuOpen ? (
                  <HiMenuAlt3 className="text-gray-200" size={25} />
                ) : (
                  <IoClose className="text-gray-200" size={25} />
                )} */}
                <label className="hamburger">
                  <input
                    type="checkbox"
                    checked={isMenuOpen}
                    onChange={() => setIsMenuOpen((prev) => !prev)}
                  />
                  <svg viewBox="0 0 32 32">
                    <path
                      className="line line-top-bottom"
                      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path className="line" d="M7 16 27 16"></path>
                  </svg>
                </label>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-primary-800/50"
          onClick={handleOverlayClick}
        >
          <div className="pointer-events-none fixed inset-0 flex items-end justify-center">
            <motion.div
              id="drawer"
              ref={drawerRef}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              className="pointer-events-auto w-full max-w-lg bg-primary-900/80"
              style={{ y }}
              drag="y"
              dragControls={controls}
              onClick={(e) => e.stopPropagation()}
              onDragEnd={() => {
                if (y.get() >= height * 0.3) {
                  handleClose();
                }
              }}
              dragListener={true}
              dragElastic={{ top: 0, bottom: 0.5 }}
              dragConstraints={{ top: 0, bottom: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
              }}
            >
              <div className="z-10 flex justify-center rounded-t-3xl border-b border-primary-400/20 bg-primary-700/50 py-3 backdrop-blur-sm">
                <button
                  onPointerDown={(e) => controls.start(e)}
                  className="h-1 w-12 cursor-grab touch-none rounded-full bg-neutral-100 active:cursor-grabbing"
                ></button>
              </div>
              <div className="relative z-0 h-full overflow-y-hidden">
                <div className="flex flex-col items-center border-gray-800 bg-primary-700/50 py-4 pt-2 backdrop-blur-sm">
                  <Button
                    className="text-lg"
                    type="plain"
                    callBack={() => {
                      onOpenModal("contact");
                      setIsMenuOpen(false);
                    }}
                  >
                    <MdMail size={20} />
                    Contact
                  </Button>
                  <Button
                    to="/projects"
                    targetBlank={false}
                    className="text-lg"
                    type="plain"
                  >
                    <MdOutlineWork size={20} />
                    Projects
                  </Button>
                  <Button
                    type="plain"
                    className="text-lg"
                    callBack={() => {
                      onOpenModal("blog");
                      setIsMenuOpen(false);
                    }}
                  >
                    <FaNewspaper />
                    Blog
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Navigation;
