function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-900 px-4 py-4 text-center text-gray-300">
      <div className="m-auto max-w-4xl border-t border-gray-800 pt-4">
        <p className="md:text-md text-sm">
          &copy; {year} <span className="font-semibold">Giorgi Bekauri</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
