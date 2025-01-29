import { AnimatePresence, motion } from "framer-motion";
import { MdMailOutline } from "react-icons/md";
import Button from "../ui/Button";
import { useKeyListener } from "../hooks/useKeyListener";

const ContactModal = ({ isOpen, setIsOpen }) => {
  // Close the modal if the escape key is pressed
  useKeyListener(() => isOpen && setIsOpen(false), "Escape");

  function handleModalClose() {
    setIsOpen(false);
  }
  const handleRedirect = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=beqauri.forwork@gmail.com",
      "_blank"
    );
    handleModalClose();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center bg-slate-900/20 p-4 backdrop-blur sm:p-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 px-6 py-8 text-gray-200 shadow-xl sm:px-12 sm:py-10"
          >
            {/* absolute -left-24 -top-24 */}
            <MdMailOutline className="absolute -left-16 -top-12 z-0 rotate-12 text-[150px] text-white/10 sm:-left-24 sm:-top-24 sm:text-[250px]" />
            <div className="z-10">
              <h3 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
                Get in Touch
              </h3>
              <p className="mb-6 text-center text-sm sm:text-base">
                If you have any questions or opportunities for collaboration, I would be
                glad to hear from you.
              </p>
              <div className="flex flex-row justify-center gap-2">
                <Button type="secondary" callBack={handleModalClose}>
                  Go back
                </Button>
                <Button type="tertiary" callBack={handleRedirect}>
                  Open Email
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
