import React, { useState, useContext } from "react";
import { TaskContext } from "../context/taskContext";
import "./style.css";
import { toast } from "react-toastify";
function AddTask({ setShowModal, editingTask, setEditingTask }) {
  const { tasks, setTasks } = useContext(TaskContext);
  const [title, setTitle] = useState(editingTask ? editingTask.title : "");
  const [priority, setPriority] = useState(
    editingTask ? editingTask.priority : "High",
  );
  const [status, setStatus] = useState(
    editingTask ? editingTask.status : "Pending",
  );
  const [dueDate, setDueDate] = useState(
    editingTask ? editingTask.dueDate : "",
  );
  const handleAddTask = () => {
    if (title.trim() === "" || dueDate === "") {
      toast.error("Please fill all required fields.");
      return;
    }
    if (editingTask) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              title,
              priority,
              status,
              dueDate,
            }
          : task,
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      toast.success("Task updated successfully!");
    } else {
      const newTask = {
        id: Date.now(),
        title,
        priority,
        status,
        dueDate,
      };
      setTasks([...tasks, newTask]);
      toast.success("Task added successfully!");
    }
    setTitle("");
    setPriority("High");
    setStatus("Pending");
    setDueDate("");
    setShowModal(false);
  };
  return (
    <div className="add-task-overlay">
      <div className="add-task-modal">
        <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleAddTask}>
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddTask;
