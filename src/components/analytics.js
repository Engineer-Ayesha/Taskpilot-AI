import React, { useContext } from "react";
import "./style.css";
import { TaskContext } from "../context/taskContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
function Analytics() {
  const { tasks } = useContext(TaskContext);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) < new Date() && task.status !== "Completed",
  ).length;
  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const productivityData = [
    {
      name: "Completed",
      tasks: completedTasks,
    },
    {
      name: "Pending",
      tasks: pendingTasks,
    },
    {
      name: "Overdue",
      tasks: overdueTasks,
    },
  ];
  const pieData = [
    {
      name: "Completed",
      value: completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
    {
      name: "Overdue",
      value: overdueTasks,
    },
  ];
  const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];
  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1 id="analytics-heading">Analytics</h1>
          <p id="analytics-description">
            Monitor your productivity and task performance.
          </p>
        </div>
        <select id="analytics-filter">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="analytics-stats">
        <div className="analytics-card">
          <i className="fa-solid fa-list-check"></i>
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>
        <div className="analytics-card">
          <i className="fa-solid fa-circle-check"></i>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>
        <div className="analytics-card">
          <i className="fa-solid fa-hourglass-half"></i>
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
        <div className="analytics-card">
          <i className="fa-solid fa-chart-line"></i>
          <h2>{completionRate}%</h2>
          <p>Productivity</p>
        </div>
      </div>
      <div className="analytics-chart-container">
        <div className="chart-box">
          <div className="chart-title">
            <h2>Weekly Productivity</h2>
          </div>
          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="tasks" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="chart-box">
          <div className="chart-title">
            <h2>Task Categories</h2>
          </div>
          <div className="chart-placeholder">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="performance-container">
        <div className="performance-header">
          <h2>Performance Summary</h2>
        </div>
        <div className="performance-card">
          <div className="performance-item">
            <span>Tasks Completed</span>
            <strong>{completedTasks}</strong>
          </div>
          <div className="performance-item">
            <span>Completion Rate</span>
            <strong>78%</strong>
          </div>
          <div className="performance-item">
            <span>Average Per Day</span>
            <strong>6 Tasks</strong>
          </div>
          <div className="performance-item">
            <span>Longest Streak</span>
            <strong>18 Days</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Analytics;
