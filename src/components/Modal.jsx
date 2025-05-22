import { AnimatePresence, motion } from "framer-motion";
import { MdMailOutline } from "react-icons/md";
import Button from "../ui/Button";
import { useKeyListener } from "../hooks/useKeyListener";
import { FaNewspaper } from "react-icons/fa";
const Modal = ({
  isOpen,
  closeModal,
  modalType,
  modalTitle,
  modalBody,
  actionBtnContent,
  redirectLink,
}) => {
  // Close the modal if the escape key is pressed
  useKeyListener(() => isOpen && closeModal(), "Escape");

  function handleModalClose() {
    closeModal();
  }

  const handleRedirect = () => {
    window.open(redirectLink, "_blank");
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
            {modalType && (
              <>
                {modalType === "contact" && (
                  <MdMailOutline className="absolute -left-16 -top-12 z-0 rotate-12 text-[150px] text-white/10 sm:-left-24 sm:-top-24 sm:text-[250px]" />
                )}

                {modalType === "blog" && (
                  <FaNewspaper className="absolute -left-16 -top-12 z-0 rotate-12 text-[150px] text-white/10 sm:-left-24 sm:-top-24 sm:text-[250px]" />
                )}
              </>
            )}

            <div className="z-10">
              <h3 className="mb-2 text-center text-2xl font-bold sm:text-3xl">
                {modalTitle}
              </h3>
              <p className="mb-6 text-center text-sm sm:text-base">{modalBody}</p>
              <div className="flex flex-row justify-center gap-2">
                <Button type="secondary" callBack={handleModalClose}>
                  Go back
                </Button>
                <Button type="tertiary" callBack={handleRedirect}>
                  {actionBtnContent}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;