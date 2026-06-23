function TaskList({ tasks, deleteTask, toggleComplete, setEditingTask }) {
  const getPriorityClass = (priority) => {
    if (priority === "High") return "priority high";
    if (priority === "Medium") return "priority medium";
    return "priority low";
  };

  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks found</h3>
          <p>Try adding a task or changing your filters.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className={`task-item ${isOverdue(task) ? "overdue-task" : ""}`}
          >
            <div className="task-content">
              <span
                className={task.completed ? "completed" : ""}
                onClick={() => toggleComplete(task)}
              >
                {task.title}
              </span>

              <div className="task-meta">
                <span className={getPriorityClass(task.priority)}>
                  {task.priority}
                </span>

                {task.dueDate && (
                  <small>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </small>
                )}

                {isOverdue(task) && <small className="overdue-label">Overdue</small>}

                <small>{task.completed ? "Completed" : "Pending"}</small>
              </div>
            </div>

            <div className="task-buttons">
              <button className="edit-btn" onClick={() => setEditingTask(task)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;