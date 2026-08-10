import React, { useContext, useState } from "react";
import { TaskContext } from "../context/taskContext";
import AddTask from "./addTask";
import { toast } from "react-toastify";
function Tasks() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully!");
  };
  const handleToggleStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "Completed" ? "Pending" : "Completed",
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };
  const handleClearAll = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
    toast.success("All tasks cleared successfully!");
  };
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Overdue"
          ? new Date(task.dueDate) < new Date() && task.status !== "Completed"
          : task.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" ? true : task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "Newest") {
      return b.id - a.id;
    }
    if (sortBy === "Oldest") {
      return a.id - b.id;
    }
    if (sortBy === "Priority") {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === "Deadline") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });
  return (
    <div className="tasks-page">
      <div className="tasks-page-header">
        <div className="heading-container">
          <h1 id="tasks-heading">Tasks</h1>
          <p id="tasks-description">
            Manage, organize and track all your daily tasks.
          </p>
        </div>
        <button id="clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
        <button id="new-task-btn" onClick={() => setShowModal(true)}>
          + Add New Task
        </button>
      </div>
      <div className="filter-container">
        <div className="search-task-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-dropdown"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
        <select
          className="filter-dropdown"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          className="filter-dropdown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Priority">Priority</option>
          <option value="Deadline">Deadline</option>
        </select>
      </div>
      <div className="tasks-list-container">
        {sortedTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={task.status === "Completed"}
                onChange={() => handleToggleStatus(task.id)}
              />
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.status}</p>
              </div>
            </div>
            <div className="task-right">
              <span
                className={`priority ${
                  task.priority === "High"
                    ? "high"
                    : task.priority === "Medium"
                      ? "medium"
                      : "low"
                }`}
              >
                {task.priority}
              </span>
              <span className="due-date">{task.dueDate}</span>
              <button
                className="edit-btn"
                onClick={() => {
                  setEditingTask(task);
                  setShowModal(true);
                }}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
        {showModal && (
          <AddTask
            setShowModal={setShowModal}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        )}
      </div>
    </div>
  );
}
export default Tasks;
