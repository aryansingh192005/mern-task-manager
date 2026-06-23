import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StatsCards from "./components/StatsCards";
import {
  getTasks,
  createTask,
  updateTaskById,
  deleteTaskById,
} from "./services/taskService";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([newTask, ...tasks]);
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskById(id);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = await updateTaskById(task._id, {
        title: task.title,
        completed: !task.completed,
        priority: task.priority,
        dueDate: task.dueDate,
      });

      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
      toast.success(
        !task.completed ? "Task marked complete" : "Task marked pending"
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const updateTask = async (id, updatedTaskData) => {
    try {
      const taskToEdit = tasks.find((task) => task._id === id);

      const updatedTask = await updateTaskById(id, {
        title: updatedTaskData.title,
        completed: taskToEdit.completed,
        priority: updatedTaskData.priority,
        dueDate: updatedTaskData.dueDate,
      });

      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
      setEditingTask(null);
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to update task");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setSortBy("newest");
  };

  const filteredAndSortedTasks = useMemo(() => {
    let updatedTasks = [...tasks];

    updatedTasks = updatedTasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter === "completed") {
      updatedTasks = updatedTasks.filter((task) => task.completed);
    } else if (statusFilter === "pending") {
      updatedTasks = updatedTasks.filter((task) => !task.completed);
    }

    if (priorityFilter !== "all") {
      updatedTasks = updatedTasks.filter(
        (task) => task.priority?.toLowerCase() === priorityFilter
      );
    }

    if (sortBy === "newest") {
      updatedTasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "oldest") {
      updatedTasks.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "dueDate") {
      updatedTasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return updatedTasks;
  }, [tasks, statusFilter, priorityFilter, searchTerm, sortBy]);

  return (
    <div className="app">
      <Toaster position="top-right" />

      <h1>MERN Task Manager</h1>

      <StatsCards tasks={tasks} />

      <TaskForm
        addTask={addTask}
        editingTask={editingTask}
        updateTask={updateTask}
      />

      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      <div className="clear-filters-wrap">
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {loading ? (
        <div className="empty-state">
          <h3>Loading tasks...</h3>
          <p>Please wait while we fetch your tasks.</p>
        </div>
      ) : (
        <TaskList
          tasks={filteredAndSortedTasks}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
          setEditingTask={setEditingTask}
        />
      )}
    </div>
  );
}

export default App;