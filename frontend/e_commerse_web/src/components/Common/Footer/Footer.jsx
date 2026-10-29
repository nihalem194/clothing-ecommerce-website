import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-800 bg-white py-4 ">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-6 md:flex-row">
        {/* Logo */}
        <div>
          <h2 className="font-serif text-2xl font-normal text-gray-800">
            FASCO
          </h2>
        </div>

        {/* Footer Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-600">
          <Link to="/" className="font-bold text-black">
            Home
          </Link>

          <Link to="/shop" className=" font-bold text-black">
            Shop
          </Link>

          <Link to="/products" className=" font-bold text-black">
            Products
          </Link>

          <Link to="/pages" className=" font-bold text-black">
            Pages
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100 px-4 py-3 text-center">
        <p className="text-xs text-gray-500">
          Copyright © 2026 FASCO. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;