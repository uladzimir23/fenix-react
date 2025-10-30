import React from 'react';
import { firmwareCategories } from '../data/firmwareData';
import './SearchFilters.css';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  brands: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  sortBy,
  setSortBy,
  brands
}) => {
  return (
    <div className="search-filters">
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск прошивок..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="category-filter">Категория:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все категории</option>
            {firmwareCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="brand-filter">Марка:</label>
          <select
            id="brand-filter"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="filter-select"
          >
            <option value="all">Все марки</option>
            {brands.filter(b => b !== 'all').map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="sort-filter">Сортировка:</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
            <option value="popular">По популярности</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;