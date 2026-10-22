
import { useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search:", searchTerm);
  };

  return (
    <>
      {isOpen ? (
        <form
          className="d-flex align-items-center justify-content-center w-100"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control w-50"
          />

          <button type="submit" className="btn btn-dark ms-2">
            Search
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary ms-2"
            onClick={handleSearchToggle}
          >
            Close
          </button>
        </form>
      ) : (
        <button
          type="button"
          className="btn btn-link text-dark"
          onClick={handleSearchToggle}
        >
          <i className="bi bi-search fs-5"></i>
        </button>
      )}
    </>
  );
};

export default Search;
