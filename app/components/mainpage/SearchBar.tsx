import React from 'react';

const SearchBar = () => {
  return (
    <form className="flex items-center w-full max-w-sm mx-auto md:max-w-xl">  {/* Responsive max-width */}
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="text-black text-sm rounded-full block w-full ps-4 md:ps-10 p-1.5 md:p-2.5 border-black border-2"
          placeholder="Search Talent"
          required
        />
      </div>
      
      <button
        type="submit"
        className="p-1.5 md:p-2.5 ms-2 text-sm font-medium text-black"
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
