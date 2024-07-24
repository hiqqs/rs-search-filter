import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ItemList from './components/ItemList';
import items from './data/items';
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 1000], rating: 0 });
  const [sortOrder, setSortOrder] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const filteredItems = items
    .filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category ? item.category === filters.category : true) &&
      item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1] &&
      item.rating >= filters.rating
    )
    .sort((a, b) => {
      if (sortOrder === 'priceAsc') return b.price - a.price;
      if (sortOrder === 'priceDesc') return a.price - b.price;
      if (sortOrder === 'ratingDesc') return b.rating - a.rating;
      return 0;
    });

    const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="App">
      <h1>Search and Filter Example</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onSortOrderChange={handleSortOrderChange}
        categories={categories}
      />
      {filteredItems.length > 0 ? (
        <ItemList items={filteredItems} />
      ) : (
        <p data-testid="no-results-message">No results found</p>
      )}
    </div>
  );
};

export default App;
