import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const saveEdit = () => {
    onEdit(todo.id, draft);
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <li className={`todo-item${todo.completed ? ' completed' : ''}${editing ? ' editing' : ''}`}>
      {editing ? (
        <input
          ref={inputRef}
          className="edit-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <button
            className={`checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? '완료 취소' : '완료로 표시'}
          >
            {todo.completed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6L5 9L10 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <span className="todo-text" onDoubleClick={startEdit}>
            {todo.text}
          </span>
          <button
            className="delete-btn"
            onClick={() => onDelete(todo.id)}
            aria-label="삭제"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </>
      )}
    </li>
  );
}
