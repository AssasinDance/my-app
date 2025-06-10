import React from 'react'
import clsx from 'clsx'
import './task-filter.css'

export default function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ]

  const handleFilterClick = (filterId) => {
    onFilterChange(filterId)
  }

  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter.id}>
          <button
            className={clsx({ selected: currentFilter === filter.id })}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
