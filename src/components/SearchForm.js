import React, { useRef, useEffect } from "react";

export default function SearchForm({ setSearchTerm }) {
  const searchValue = useRef("");
  // console.log(searchValue);

  useEffect(() => {
    searchValue.current.focus();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };
  return (
    <section className=''>
      <h2 className='section-title'>Search Cocktails</h2>
      <form className='form search-form' onSubmit={handleSubmit} action=''>
        <div className='form-control'>
          <label htmlFor='name' className='name'>
            search your favorite coktail
          </label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={searchCocktail}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
}
