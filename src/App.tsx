import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { FilterBar } from './components/FilterBar';

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    toggleAll,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
    allCompleted,
  } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>todos</h1>
      </header>

      <main className="card">
        <TodoInput
          onAdd={addTodo}
          hasItems={totalCount > 0}
          allCompleted={allCompleted}
          onToggleAll={toggleAll}
        />

        {todos.length > 0 && (
          <ul className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}

        {totalCount === 0 && (
          <div className="empty-state">
            <p>할 일이 없습니다.</p>
            <p className="hint">위 입력란에 할 일을 입력해보세요!</p>
          </div>
        )}

        {todos.length === 0 && filter !== 'all' && totalCount > 0 && (
          <div className="empty-state">
            <p>해당하는 항목이 없습니다.</p>
          </div>
        )}

        {totalCount > 0 && (
          <FilterBar
            filter={filter}
            onFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>더블클릭으로 수정 · Enter로 저장 · Esc로 취소</p>
      </footer>
    </div>
  );
}
