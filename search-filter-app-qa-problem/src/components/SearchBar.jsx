import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleChange = (e) => {
    setTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={term}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
