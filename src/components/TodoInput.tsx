import { useState, type KeyboardEvent } from 'react';

interface Props {
  onAdd: (text: string) => void;
  hasItems: boolean;
  allCompleted: boolean;
  onToggleAll: () => void;
}

export function TodoInput({ onAdd, hasItems, allCompleted, onToggleAll }: Props) {
  const [value, setValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      onAdd(value);
      setValue('');
    }
  };

  return (
    <div className="todo-input-row">
      {hasItems && (
        <button
          className={`toggle-all ${allCompleted ? 'active' : ''}`}
          onClick={onToggleAll}
          aria-label="전체 완료 토글"
          title="전체 완료 토글"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8L6.5 11.5L13 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
      <input
        className="new-todo"
        type="text"
        placeholder="할 일을 입력하세요..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}
