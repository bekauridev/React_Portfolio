function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="md:text-md border-t border-gray-800 bg-gray-200 bg-primary-900 px-4 py-4 text-center text-sm text-gray-300/90 sm:text-sm">
      <p>&copy;{year} Giorgi Bekauri. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
