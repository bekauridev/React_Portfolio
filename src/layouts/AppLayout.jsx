import { Outlet } from "react-router";
import Navigation from "../partials/Navigation";
import Footer from "../partials/Footer";
import { motion } from "framer-motion";

import { ToastContainer } from "react-toastify";
import { useState } from "react";
import ContactModal from "../components/ContactModal";

function AppLayout() {
  const [isContacsModalOpen, setIsContactsModalOpen] = useState(false);

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
      <Navigation setIsContactsModalOpen={setIsContactsModalOpen} />
      <ContactModal isOpen={isContacsModalOpen} setIsOpen={setIsContactsModalOpen} />
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
