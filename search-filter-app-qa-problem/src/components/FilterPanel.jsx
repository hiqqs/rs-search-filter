import React from 'react';

const FilterPanel = ({ filters, onFilterChange, onSortOrderChange, categories }) => {
  const handleCategoryChange = (e) => {
    onFilterChange({ ...filters, category: e.target.value });
  };

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ ...filters, rating: Number(e.target.value) });
  };

  const handleSortChange = (e) => {
    onSortOrderChange(e.target.value);
  };

  return (
    <div>
      <div>
        <label for="category">Category:</label>
        <select name="category" id="category" value={filters.category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <label for="price-range">Price Range:</label>
        <select name="price-range" id="price-range" value={filters.priceRange.join(',')} onChange={handlePriceChange}>
          <option value="0,1000">All</option>
          <option value="0,100">0 - 100</option>
          <option value="100,500">100 - 500</option>
          <option value="500,1000">500 - 1000</option>
        </select>
      </div>
      <div>
        <label for="rating">Rating:</label>
        <select name="rating" id="rating" value={filters.rating} onChange={handleRatingChange}>
          <option value="0">All</option>
          <option value="4">4 stars and above</option>
          <option value="3">3 stars and above</option>
          <option value="2">2 stars and above</option>
          <option value="1">1 star and above</option>
        </select>
      </div>
      <div>
        <label for="sort-by">Sort By:</label>
        <select name="sort-by" id="sort-by" onChange={handleSortChange}>
          <option value="">None</option>
          <option value="priceDesc">Price: Low to High</option>
          <option value="priceAsc">Price: High to Low</option>
          <option value="ratingDesc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
