import type { FilterType } from '../types';

interface Props {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행 중' },
  { key: 'completed', label: '완료' },
];

export function FilterBar({
  filter,
  onFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="filter-bar">
      <span className="items-left">
        <strong>{activeCount}</strong>개 남음
      </span>

      <div className="filter-tabs" role="tablist">
        {FILTERS.map(f => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`filter-tab ${filter === f.key ? 'active' : ''}`}
            onClick={() => onFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          완료 삭제 ({completedCount})
        </button>
      )}
    </div>
  );
}
