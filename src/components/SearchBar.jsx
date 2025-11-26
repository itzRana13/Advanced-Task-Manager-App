import { memo, useState, useCallback } from 'react';
import '../styles/SearchBar.css';

const SearchBar = memo(({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleClear = useCallback(() => {
    setSearchQuery('');
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 19L14.65 14.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Search tasks"
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

