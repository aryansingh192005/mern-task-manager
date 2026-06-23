import { useEffect, useState } from "react";

function TaskForm({ addTask, editingTask, updateTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setPriority(editingTask.priority || "Medium");
      setDueDate(
        editingTask.dueDate ? editingTask.dueDate.split("T")[0] : ""
      );
    } else {
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title,
      priority,
      dueDate: dueDate || null,
    };

    if (editingTask) {
      updateTask(editingTask._id, taskData);
    } else {
      addTask(taskData);
      setTitle("");
      setPriority("Medium");
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;