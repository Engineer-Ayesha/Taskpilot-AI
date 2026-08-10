import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import dashboardimg from "./images/dashboardimg.png";
import { TaskContext } from "../context/taskContext";
import Chart from "./chart";
import Tasklist from "./tasklist";
import Deadline from "./deadline";
import Activity from "./activity";
function Dashboard() {
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date(),
  ).length;
  const handleNewTask = () => {
    navigate("/tasks");
  };
  return (
    <div>
      <div className="dashboard-container">
        <div className="welcome-container">
          <div className="intro-container">
            <p id="welcome-text">Welcome back! Ready to conquer your tasks?</p>
            <p id="decription">
              Stay organized, prioritize your work, and track your
              productivity—all in one smart workspace.
            </p>
            <button id="add-task" onClick={handleNewTask}>
              + New Task
            </button>
          </div>
          <div className="image-container">
            <img src={dashboardimg} alt="dashboard-image" />
          </div>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <i
              id="task-icon"
              className="fa-regular fa-calendar"
              style={{ color: "#6366F1" }}
            ></i>
            <p id="task-text">{totalTasks}</p>
            <label id="task-label">Total tasks</label>
          </div>
          <div className="stat-card">
            <i
              id="task-icon"
              className="fa-solid fa-square-check"
              style={{ color: "#22C55E" }}
            ></i>
            <p id="task-text">{completedTasks}</p>
            <label id="task-label">Completed</label>
          </div>
          <div className="stat-card">
            <i
              id="task-icon"
              className="fa-solid fa-hourglass-half"
              style={{ color: "#F59E0B" }}
            ></i>
            <p id="task-text">{pendingTasks}</p>
            <label id="task-label">Pending</label>
          </div>
          <div className="stat-card">
            <i
              id="task-icon"
              className="fa-solid fa-triangle-exclamation"
              style={{ color: "#EF4444" }}
            ></i>
            <p id="task-text">{overdueTasks}</p>
            <label id="task-label">Overdue</label>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-header">
            <h2 id="chart-heading">Productivity Overview</h2>
            <select id="chart-filter">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="chart-area">
            <Chart tasks={tasks} />
          </div>
        </div>
        <div className="tasks-container">
          <div className="today-tasks">
            <div className="task-header">
              <h2>Today's Tasks</h2>
              <p>View All</p>
            </div>
            <div className="task-list">
              <Tasklist tasks={tasks} />
            </div>
          </div>
          <div className="upcoming-tasks">
            <div className="task-header">
              <h2>Upcoming Deadlines</h2>
              <p>View All</p>
            </div>
            <div className="deadline-list">
              <Deadline />
            </div>
          </div>
        </div>
        <div className="activity-container">
          <div className="activity-header">
            <h2>Recent Activity</h2>
            <p>View All</p>
          </div>
          <div className="activity-list">
            <Activity />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
