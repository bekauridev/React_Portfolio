import { Outlet } from "react-router";
import Navigation from "../partials/Navigation";
import Footer from "../partials/Footer";
import { motion } from "framer-motion";

import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Modal from "../components/Modal";

function AppLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState({});

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
    <div className="bg-primary-900">
      {/* Initialize Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        toastClassName={"text-md font-poppins font-sans text-gray-300"}
        icon={false}
      />
      <Navigation onOpenModal={openModal} />
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalType={modalType}
        modalTitle={modalContent.title}
        modalBody={modalContent.body}
        actionBtnContent={modalContent.actionBtnContent}
        redirectLink={modalContent.redirectLink}
      />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col items-center justify-center md:flex-row md:items-start"
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
