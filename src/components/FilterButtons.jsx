import { memo } from 'react';
import '../styles/FilterButtons.css';

const FilterButtons = memo(({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="filter-buttons" role="tablist">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
          role="tab"
          aria-selected={activeFilter === filter.id}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
});

FilterButtons.displayName = 'FilterButtons';

export default FilterButtons;

