import { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_CATEGORIES = ['personal', 'work', 'shopping', 'health', 'finance'];

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: '1', title: 'Design personal portfolio website', description: 'Create wireframes, gather assets, and establish the visual design system.', category: 'personal', priority: 'high', completed: false, createdAt: Date.now() - 86400000 },
      { id: '2', title: 'Complete project weekly status report', description: 'Write summary of achievements, blockages, and timeline updates.', category: 'work', priority: 'medium', completed: true, createdAt: Date.now() - 43200000 },
      { id: '3', title: 'Restock groceries for the week', description: 'Buy organic milk, eggs, apples, almond milk, and chicken breasts.', category: 'shopping', priority: 'low', completed: false, createdAt: Date.now() }
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date-newest');

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('personal');
  const [newPriority, setNewPriority] = useState('medium');

  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [editingCategory, setEditingCategory] = useState('personal');
  const [editingPriority, setEditingPriority] = useState('medium');

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDescription.trim(),
      category: newCategory,
      priority: newPriority,
      completed: false,
      createdAt: Date.now()
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setNewTitle('');
    setNewDescription('');
    setNewCategory('personal');
    setNewPriority('medium');
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (editingId === taskId) {
      setEditingId(null);
    }
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
    setEditingCategory(task.category);
    setEditingPriority(task.priority);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTitle.trim()) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingId
          ? {
              ...task,
              title: editingTitle.trim(),
              description: editingDescription.trim(),
              category: editingCategory,
              priority: editingPriority
            }
          : task
      )
    );

    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getPriorityWeight = (priority) => {
    switch (priority) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || 
                          (selectedStatus === 'active' && !task.completed) || 
                          (selectedStatus === 'completed' && task.completed);

    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'date-newest') {
      return b.createdAt - a.createdAt;
    }
    if (sortBy === 'date-oldest') {
      return a.createdAt - b.createdAt;
    }
    if (sortBy === 'priority-desc') {
      return getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
    }
    if (sortBy === 'priority-asc') {
      return getPriorityWeight(a.priority) - getPriorityWeight(b.priority);
    }
    return 0;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="task-manager-dashboard">
      <nav className="navbar-header">
        <div className="nav-container">
          <div className="brand-logo">
            TaskFlow<span>.</span>
          </div>

          <div className="search-box-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                &times;
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="dashboard-layout">
          
          <aside className="sidebar-form-panel">
            {editingId ? (
              <div className="form-card editing">
                <div className="form-header">
                  <h2>Edit Task</h2>
                  <p>Update task properties and save changes.</p>
                </div>
                <form onSubmit={handleSaveEdit} className="task-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-title">Title</label>
                    <input
                      id="edit-title"
                      type="text"
                      className="form-input"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      placeholder="Task title..."
                      maxLength={80}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-desc">Description</label>
                    <textarea
                      id="edit-desc"
                      className="form-textarea"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      placeholder="Add details (optional)..."
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <div className="category-options">
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`category-selector-pill ${editingCategory === cat ? 'active' : ''}`}
                          onClick={() => setEditingCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <div className="priority-options">
                      {['low', 'medium', 'high'].map((prio) => (
                        <button
                          key={prio}
                          type="button"
                          className={`priority-selector-button ${prio} ${editingPriority === prio ? 'active' : ''}`}
                          onClick={() => setEditingPriority(prio)}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="submit-button primary-btn">Save Changes</button>
                    <button type="button" className="cancel-button secondary-btn" onClick={handleCancelEdit}>Cancel</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="form-card">
                <div className="form-header">
                  <h2>Create Task</h2>
                  <p>Add a new task to your flow board.</p>
                </div>
                <form onSubmit={handleAddTask} className="task-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="new-title">Title</label>
                    <input
                      id="new-title"
                      type="text"
                      className="form-input"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="What needs to be done?"
                      maxLength={80}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="new-desc">Description</label>
                    <textarea
                      id="new-desc"
                      className="form-textarea"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Add details (optional)..."
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <div className="category-options">
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          className={`category-selector-pill ${newCategory === cat ? 'active' : ''}`}
                          onClick={() => setNewCategory(cat)}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority</label>
                    <div className="priority-options">
                      {['low', 'medium', 'high'].map((prio) => (
                        <button
                          key={prio}
                          type="button"
                          className={`priority-selector-button ${prio} ${newPriority === prio ? 'active' : ''}`}
                          onClick={() => setNewPriority(prio)}
                        >
                          {prio}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="submit-button primary-btn">Add Task</button>
                </form>
              </div>
            )}

            <div className="progress-dashboard-card">
              <h3>Activity Progress</h3>
              <div className="progress-numbers">
                <span className="rate-text">{completionRate}% Done</span>
                <span className="ratio-text">{completedCount} of {totalCount} tasks</span>
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>
          </aside>

          <section className="tasks-board-panel">
            <div className="filters-toolbar">
              <div className="status-tabs-wrapper">
                {['all', 'active', 'completed'].map((status) => (
                  <button
                    key={status}
                    className={`status-tab ${selectedStatus === status ? 'active' : ''}`}
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              <div className="sorting-selector-wrapper">
                <label htmlFor="sort-dropdown-select">Sort by</label>
                <select
                  id="sort-dropdown-select"
                  className="sort-dropdown"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-newest">Newest First</option>
                  <option value="date-oldest">Oldest First</option>
                  <option value="priority-desc">Priority: High to Low</option>
                  <option value="priority-asc">Priority: Low to High</option>
                </select>
              </div>
            </div>

            <div className="category-filters-scroll-container">
              <div className="category-filters-row">
                <button
                  className={`category-filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </button>
                {DEFAULT_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`category-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="task-cards-list">
              {sortedTasks.length > 0 ? (
                sortedTasks.map((task) => (
                  <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''} ${task.priority}`}>
                    <div className="task-main-info">
                      <button
                        className="task-checkbox-trigger"
                        onClick={() => handleToggleComplete(task.id)}
                        aria-label={task.completed ? 'Mark task as active' : 'Mark task as completed'}
                      >
                        <div className={`checkbox-box ${task.completed ? 'checked' : ''}`}>
                          {task.completed && (
                            <svg className="checkmark-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </button>

                      <div className="task-content">
                        <h3 className="task-title">{task.title}</h3>
                        {task.description && <p className="task-description">{task.description}</p>}
                        
                        <div className="task-badges-row">
                          <span className="task-badge-tag category">{task.category}</span>
                          <span className={`task-badge-tag priority ${task.priority}`}>{task.priority}</span>
                        </div>
                      </div>
                    </div>

                    <div className="task-actions-wrapper">
                      {!task.completed && (
                        <button
                          className="action-button edit-btn"
                          onClick={() => handleStartEdit(task)}
                          aria-label="Edit task"
                        >
                          <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      )}
                      <button
                        className="action-button delete-btn"
                        onClick={() => handleDeleteTask(task.id)}
                        aria-label="Delete task"
                      >
                        <svg className="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-tasks-state">
                  <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <h3>No tasks found</h3>
                  <p>Try resetting filters, modifying your search, or adding a new task to get started.</p>
                </div>
              )}
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}
