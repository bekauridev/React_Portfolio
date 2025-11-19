import { Outlet } from "react-router";
import Navigation from "../partials/Navigation";
import Footer from "../partials/Footer";
import { motion } from "framer-motion";

import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Modal from "../components/Modal";
import Story from "../features/story";
import useStory from "../features/story/hooks/useStory";

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState({});
  const { isStoryOpen, handleStoryClose } = useStory();

  // Open Modal and set content dynamically
  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);

    // Define modal content based on the modal type
    switch (type) {
      case "contact":
        setModalContent({
          title: "Get in Touch",
          body: "If you have any questions or opportunities for collaboration, I would be glad to hear from you.",
          actionBtnContent: "Open Email",
          redirectLink:
            "https://mail.google.com/mail/?view=cm&fs=1&to=beqauri.forwork@gmail.com",
        });
        break;
      case "blog":
        setModalContent({
          title: "check out my blog",
          body: "Discover the blogs I've been creating and sharing on daily.dev",
          actionBtnContent: "View Blogs",
          redirectLink: "https://app.daily.dev/squads/bekauriblog",
        });
        break;
      default:
        setModalContent({});
    }
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalContent({});
  };

  return (
    <div className="relative min-h-screen w-full bg-primary-900">
      {/* Diagonal Fade Grid Background - Top Left */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 40%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 40%, transparent 90%)",
        }}
      />
      {/* Initialize Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnHover
        pauseOnFocusLoss
        draggable
        theme="dark"
        toastClassName="font-poppins mt-2 flex bg-slate-950 px-4 py-3 text-gray-100 shadow-md backdrop-blur-sm sm:mt-0"
        progressClassName="bg-slate-700"
        icon={true}
      />
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        modalTitle={modalContent.title}
        modalBody={modalContent.body}
        actionBtnContent={modalContent.actionBtnContent}
        redirectLink={modalContent.redirectLink}
      />
      {/* Story */}
      <Story
        isStoryOpen={isStoryOpen}
        onStoryClose={handleStoryClose}
        content={
          "https://res.cloudinary.com/duybptmkx/image/upload/f_webp/React_portfolio/story/PNG_current_story_image.png"
        }
      />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative m-auto sm:max-w-lg md:max-w-5xl"
        >
          <Navigation onOpenModal={openModal} />

          <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
            <Outlet />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
