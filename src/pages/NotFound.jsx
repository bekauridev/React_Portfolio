import { FiArrowLeft } from "react-icons/fi";

function NotFound() {
  return (
    <div className="flex h-screen flex-col items-start justify-center bg-primary-800 px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="text-lg font-semibold text-primary-300">404</h1>
      <h2 className="mt-4 text-5xl font-semibold tracking-tight text-gray-400 sm:text-7xl">
        Page not found
      </h2>
      <p className="mt-4 text-lg font-medium text-gray-400 sm:text-xl">
        Sorry, we couldn&#39;t find the page you&#39;re looking for.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center gap-1 font-bold text-primary-300 transition-colors duration-300 hover:text-primary-400 hover:underline"
      >
        <FiArrowLeft size={18} strokeWidth={3} /> Back to home
      </a>
    </div>
  );
}

export default NotFound;
