import Search from "../Search/Search";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="w-100 sticky-top bg-white shadow-sm">
        <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarnav"
            aria-controls="navbarnav"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link to="/" className="navbar-brand mx-auto order-0 d-lg-none d-flex">
            <h2 className="m-0 fw-bold" style={{ letterSpacing: "2px" }}>
              FASCO
            </h2>
          </Link>

          <ul className="d-lg-none d-flex align-items-center gap-3">
            <li className="nav-item">
              <Link to="#">
                <i className="bi bi-search fs-5 text-dark"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#">
                <i className="bi bi-person fs-5 text-dark"></i>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link to="#">
                <i className="bi bi-heart fs-5 text-dark"></i>
                <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">
                  0
                </span>
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link to="#">
                <i className="bi bi-bag fs-5 text-dark"></i>
                <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">
                  0
                </span>
              </Link>
            </li>
          </ul>

          <div className="collapse navbar-collapse justify-content-between" id="navbarnav">
            <Link to="/" className="navbar-brand order-0 d-none d-lg-flex">
              <h2 className="m-0 fw-bold" style={{ letterSpacing: "2px" }}>
                FASCO
              </h2>
            </Link>

            <ul className="navbar-nav nav-menu align-items-center gap-4">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
              <li className="nav-item">
                <Link to="/admin" className="block bg-black text-sm px-2 text-white " >Admin</Link>
              </li>
              <li className="nav-item">
                {/* <Link to="#" data-bs-toggle="modal" data-bs-target="#SearchModel">
                  <i className="bi bi-search fs-5 text-dark"></i>
                </Link> */}
                <Search />
              </li>
              <li className="nav-item">
                <Link to="#" data-bs-toggle="modal" data-bs-target="#SignupModel">
                  <i className="bi bi-person fs-5 text-dark"></i>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link to="#">
                  <i className="bi bi-heart fs-5 text-dark"></i>
                  <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">
                    0
                  </span>
                </Link>
              </li>
              <li className="nav-item position-relative">
                <Link to="#">
                  <i className="bi bi-bag fs-5 text-dark"></i>
                  <span className="position-absolute top-0 start-100 translate-middle cart-qount rounded-pill">
                    0
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
